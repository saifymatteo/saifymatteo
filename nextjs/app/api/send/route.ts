import { Resend } from 'resend';
import { buildEmail, validateSubmission } from '@/lib/contact_submission';

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

function getExpectedHostnames(): Set<string> {
  const raw = process.env.TURNSTILE_HOSTNAMES ?? '';
  return new Set(
    raw
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0)
  );
}

// Human Check adapter (Turnstile): proof-of-humanity is verified server-side
// before a Contact Submission is accepted. See CONTEXT.md.
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

  const result = validateSubmission(body);
  if (!result.ok) {
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

  const { submission } = result;

  try {
    await getResend().emails.send(buildEmail(submission));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('send error', err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
    });
  }
}
