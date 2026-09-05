/**
 * The Contact Submission: a visitor's Name, Email, Subject and Message
 * delivered as one email to Saiful's inbox (see CONTEXT.md).
 *
 * This module owns every submission rule — the field schema, validation and
 * the shape of the resulting email. It is isomorphic: no Node APIs, no fetch,
 * no React — the Contact Form (client) and the POST /api/send route (server)
 * are both adapters at this seam. Secrets, Human Check and Resend stay at the
 * edges (ADR-0005).
 */

export const CONTACT_FIELDS = {
  name: { inputType: 'text', maxLength: 100, required: true },
  email: { inputType: 'email', maxLength: 254, required: true },
  subject: { inputType: 'text', maxLength: 100, required: true },
  message: { inputType: 'text', maxLength: 5000, required: true },
} as const;

export type ContactFieldName = keyof typeof CONTACT_FIELDS;

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactSubmissionResult =
  | { ok: true; submission: ContactSubmission }
  | { ok: false; errors: Partial<Record<ContactFieldName, string>> };

export interface ContactEmail {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

const FIELD_LABELS: Record<ContactFieldName, string> = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_FROM = 'Saiful Mashuri <hello@saifulmashuri.com>';
const EMAIL_TO = ['work@saifulmashuri.com'];
const EMAIL_SUBJECT_PREFIX = 'Contact Us: ';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function htmlBody(submission: ContactSubmission): string {
  const { name, email, subject, message } = submission;
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

/**
 * Coerces raw form data into a submission: trims and truncates each field to
 * its schema limit. Over-limit input is truncated, never rejected — matching
 * the server's behavior before this module existed.
 */
export function validateSubmission(
  raw: Record<string, unknown>
): ContactSubmissionResult {
  const fields = {} as ContactSubmission;
  const errors: Partial<Record<ContactFieldName, string>> = {};

  for (const field of Object.keys(CONTACT_FIELDS) as ContactFieldName[]) {
    const value =
      typeof raw[field] === 'string'
        ? (raw[field] as string)
            .trim()
            .slice(0, CONTACT_FIELDS[field].maxLength)
        : '';

    if (!value) {
      errors[field] = `${FIELD_LABELS[field]} is required.`;
    } else if (field === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field] = `${FIELD_LABELS[field]} is invalid.`;
    }
    fields[field] = value;
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, submission: fields };
}

export function buildEmail(submission: ContactSubmission): ContactEmail {
  const { name, email, subject, message } = submission;
  return {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: `${EMAIL_SUBJECT_PREFIX}${subject.replace(/[\r\n]+/g, ' ')}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: htmlBody(submission),
  };
}
