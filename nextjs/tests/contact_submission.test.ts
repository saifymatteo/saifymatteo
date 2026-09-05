import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import {
  CONTACT_FIELDS,
  buildEmail,
  validateSubmission,
} from '../lib/contact_submission.ts';

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Hello',
  message: 'Hi there',
};

describe('CONTACT_FIELDS', () => {
  it('matches the rules the route enforced before the module existed', () => {
    assert.deepEqual(CONTACT_FIELDS.name.maxLength, 100);
    assert.deepEqual(CONTACT_FIELDS.email.maxLength, 254);
    assert.deepEqual(CONTACT_FIELDS.subject.maxLength, 100);
    assert.deepEqual(CONTACT_FIELDS.message.maxLength, 5000);
    assert.deepEqual(CONTACT_FIELDS.email.inputType, 'email');
  });
});

describe('validateSubmission', () => {
  it('accepts a complete submission and returns it unchanged', () => {
    const result = validateSubmission({ ...valid });
    assert.deepEqual(result, { ok: true, submission: valid });
  });

  it('trims surrounding whitespace from every field', () => {
    const result = validateSubmission({
      name: '  Jane Doe  ',
      email: ' jane@example.com ',
      subject: ' Hello ',
      message: ' Hi there ',
    });
    assert.deepEqual(result, { ok: true, submission: valid });
  });

  it('truncates over-limit input instead of rejecting it', () => {
    const result = validateSubmission({
      ...valid,
      message: 'x'.repeat(6000),
    });
    assert.ok(result.ok);
    assert.deepEqual(result.submission.message.length, 5000);
  });

  it('treats a missing field as required', () => {
    const result = validateSubmission({ ...valid, subject: undefined });
    assert.ok(!result.ok);
    if (!result.ok)
      assert.deepEqual(result.errors.subject, 'Subject is required.');
  });

  it('treats a non-string field as required', () => {
    const result = validateSubmission({ ...valid, name: 42 });
    assert.ok(!result.ok);
    if (!result.ok) assert.deepEqual(result.errors.name, 'Name is required.');
  });

  it('rejects whitespace-only input', () => {
    const result = validateSubmission({ ...valid, message: '   \n\t  ' });
    assert.ok(!result.ok);
    if (!result.ok)
      assert.deepEqual(result.errors.message, 'Message is required.');
  });

  it('reports every failing field at once', () => {
    const result = validateSubmission({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    assert.ok(!result.ok);
    if (!result.ok) {
      assert.deepEqual(Object.keys(result.errors), [
        'name',
        'email',
        'subject',
        'message',
      ]);
    }
  });

  it('accepts an ordinary email address', () => {
    const result = validateSubmission({ ...valid, email: 'a.b+c@d-e.co' });
    assert.ok(result.ok);
  });

  it('rejects an email without a TLD', () => {
    const result = validateSubmission({ ...valid, email: 'user@host' });
    assert.ok(!result.ok);
    if (!result.ok) assert.deepEqual(result.errors.email, 'Email is invalid.');
  });

  it('rejects an email with spaces', () => {
    const result = validateSubmission({
      ...valid,
      email: 'user host@example.com',
    });
    assert.ok(!result.ok);
  });

  it('rejects an email without an @', () => {
    const result = validateSubmission({ ...valid, email: 'user.example.com' });
    assert.ok(!result.ok);
  });

  it('checks the email shape after truncation — a 312-char email loses its @ and is rejected', () => {
    const email = `${'x'.repeat(300)}@example.com`; // @ sits past the 254-char cut
    const result = validateSubmission({ ...valid, email });
    assert.ok(!result.ok);
    if (!result.ok) assert.deepEqual(result.errors.email, 'Email is invalid.');
  });

  it('a 256-char email truncates to a still-valid 254-char address', () => {
    const email = `${'x'.repeat(250)}@e.com`; // cut keeps '…@e.c' — @ and a dot both survive
    const result = validateSubmission({ ...valid, email });
    assert.ok(result.ok);
    if (result.ok) assert.deepEqual(result.submission.email.length, 254);
  });
});

describe('buildEmail', () => {
  it('addresses the inbox from the site identity with the visitor as reply-to', () => {
    const email = buildEmail(valid);
    assert.deepEqual(email.from, 'Saiful Mashuri <hello@saifulmashuri.com>');
    assert.deepEqual(email.to, ['work@saifulmashuri.com']);
    assert.deepEqual(email.replyTo, 'jane@example.com');
  });

  it('prefixes the subject and flattens CRLF runs to one space', () => {
    const email = buildEmail({ ...valid, subject: 'Line1\r\nLine2\n\nLine3' });
    assert.deepEqual(email.subject, 'Contact Us: Line1 Line2 Line3');
  });

  it('builds the text body from the submission', () => {
    const email = buildEmail(valid);
    assert.deepEqual(
      email.text,
      'Name: Jane Doe\nEmail: jane@example.com\n\nHi there'
    );
  });

  it('escapes HTML-significant characters in every field', () => {
    const email = buildEmail({
      ...valid,
      name: '<script>alert("x")</script>',
      subject: "Quote's & <tags>",
    });
    assert.ok(email.html.includes('&lt;script&gt;'));
    assert.ok(email.html.includes('&quot;'));
    assert.ok(email.html.includes('&#39;'));
    assert.ok(email.html.includes('&amp;'));
    assert.ok(!email.html.includes('<script>'));
  });

  it('renders message newlines as <br/>', () => {
    const email = buildEmail({ ...valid, message: 'first\nsecond' });
    assert.ok(email.html.includes('first<br/>second'));
  });
});
