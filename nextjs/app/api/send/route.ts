import { Resend } from 'resend';

// Constructed lazily so a missing API key fails the request (with a clear log)
// instead of failing the production build's page-data collection step.
let cachedResend: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  cachedResend ??= new Resend(apiKey);
  return cachedResend;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function coerceField(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function buildHtmlBody(args: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const { name, email, subject, message } = args;
  return [
    '<div style="margin:0;padding:32px 16px;background-color:#f7f7f7;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;">',
    '  <div style="max-width:560px;margin:0 auto;">',
    '    <div style="background-color:#ffffff;border:1px solid #e5e5e5;border-radius:12px;padding:32px;">',
    '      <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0494df;">Contact Us</p>',
    `      <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#2e2e2e;">${escapeHtml(subject)}</h1>`,
    '      <div style="border-top:1px solid #e5e5e5;padding-top:20px;">',
    '        <p style="margin:0 0 4px;font-size:12px;color:#696969;">Name</p>',
    `        <p style="margin:0 0 16px;font-size:15px;color:#2e2e2e;">${escapeHtml(name)}</p>`,
    '        <p style="margin:0 0 4px;font-size:12px;color:#696969;">Email</p>',
    `        <p style="margin:0 0 16px;font-size:15px;color:#2e2e2e;">${escapeHtml(email)}</p>`,
    '        <p style="margin:0 0 4px;font-size:12px;color:#696969;">Message</p>',
    `        <p style="margin:0;font-size:15px;line-height:1.6;color:#2e2e2e;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('\n');
}

function getExpectedHostnames(): Set<string> {
  const raw = process.env.TURNSTILE_HOSTNAMES ?? '';
  return new Set(
    raw
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0)
  );
}

async function verifyTurnstile(req: Request, token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.error('TURNSTILE_SECRET is not set — rejecting request');
    return false;
  }

  const expectedHostnames = getExpectedHostnames();
  if (expectedHostnames.size === 0) {
    console.error('TURNSTILE_HOSTNAMES is empty — rejecting request');
    return false;
  }

  const remoteip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, remoteip }),
        signal: AbortSignal.timeout(10_000),
      }
    );
    const result = (await res.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    return (
      result.success === true &&
      result.action === 'contact' &&
      expectedHostnames.has((result.hostname ?? '').toLowerCase())
    );
  } catch (err) {
    console.error('turnstile verification failed', err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = coerceField(body.name, 100);
  const email = coerceField(body.email, 254);
  const subject = coerceField(body.subject, 100);
  const message = coerceField(body.message, 5000);

  if (!name || !subject || !message) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = body['cf-turnstile-response'];
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Verification failed' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const verified = await verifyTurnstile(req, token);
  if (!verified) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Verification failed' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await getResend().emails.send({
      from: 'Saiful Mashuri <hello@saifulmashuri.com>',
      to: ['work@saifulmashuri.com'],
      replyTo: email,
      subject: `Contact Us: ${subject.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: buildHtmlBody({ name, email, subject, message }),
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('send error', err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
    });
  }
}
