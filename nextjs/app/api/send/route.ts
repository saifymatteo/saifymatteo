import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  try {
    await resend.emails.send({
      from: 'Saiful Mashuri <onboarding@resend.dev>', // Have to be this email
      to: ['resend@saifulmashuri.com'], // Have to be API key owner email
      subject: `Contact Us: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('send error', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
    });
  }
}
