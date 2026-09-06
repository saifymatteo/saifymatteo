'use client';

import { buttonVariants } from '@/components/button_variants';
import {
  CONTACT_FIELDS,
  validateSubmission,
  type ContactFieldName,
} from '@/lib/contact_submission';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [invalidHint, setInvalidHint] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const className =
    'w-full rounded-xl border border-ink bg-canvas px-4 py-3 text-sm text-ink outline-none placeholder:text-[#696969] focus:border-blue';

  function clearTurnstileToken() {
    setTurnstileToken(null);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setInvalidHint(null);

    // Same rules as the server, enforced before the request: the browser
    // attributes (required/type/maxLength) catch most mistakes, this catches
    // the rest (e.g. whitespace-only input).
    const result = validateSubmission(data);
    if (!result.ok) {
      const firstField = Object.keys(CONTACT_FIELDS).find(
        (field) => result.errors[field as ContactFieldName]
      ) as ContactFieldName | undefined;
      setInvalidHint(
        (firstField && result.errors[firstField]) ||
          'Please review your message.'
      );
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          'cf-turnstile-response': turnstileToken,
        }),
      });
      if (!res.ok) {
        turnstileRef.current?.reset();
        clearTurnstileToken();
        throw new Error('send failed');
      }
      setStatus('sent');
      clearTurnstileToken();
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="content-max-width-slim">
      <h2 className="text-ink text-3xl font-bold">Or reach me directly</h2>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-ink flex flex-col gap-1.5 text-sm">
            Name
            <input
              name="name"
              required={CONTACT_FIELDS.name.required}
              maxLength={CONTACT_FIELDS.name.maxLength}
              placeholder="John Doe"
              className={className}
            />
          </label>
          <label className="text-ink flex flex-col gap-1.5 text-sm">
            Email
            <input
              name="email"
              type={CONTACT_FIELDS.email.inputType}
              required={CONTACT_FIELDS.email.required}
              maxLength={CONTACT_FIELDS.email.maxLength}
              placeholder="john.doe@example.com"
              className={className}
            />
          </label>
        </div>
        <label className="text-ink flex flex-col gap-1.5 text-sm">
          Subject
          <input
            name="subject"
            required={CONTACT_FIELDS.subject.required}
            maxLength={CONTACT_FIELDS.subject.maxLength}
            placeholder="Opportunities"
            className={className}
          />
        </label>
        <label className="text-ink flex flex-col gap-1.5 text-sm">
          Message
          <textarea
            name="message"
            required={CONTACT_FIELDS.message.required}
            maxLength={CONTACT_FIELDS.message.maxLength}
            rows={6}
            placeholder="Let&#39;s create something together"
            className={cn(className, 'resize-y')}
          />
        </label>
        <div className="mt-5 flex flex-col items-center gap-8">
          <button
            type="submit"
            disabled={status === 'sending' || !turnstileToken}
            className={buttonVariants({ variant: 'blue' })}
          >
            Submit <ArrowRight className="button-arrow-slide size-5" />
          </button>
          {invalidHint && (
            <p className="text-sm text-red-500" role="alert">
              {invalidHint}
            </p>
          )}
          {status === 'sent' && (
            <p className="text-blue text-sm">
              Message sent — I&#39;ll get back to you soon!
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500">
              Something went wrong — please try again or email me directly.
            </p>
          )}
          <Turnstile
            ref={turnstileRef}
            siteKey="0x4AAAAAAElx0wG2M-1zfp5U"
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={clearTurnstileToken}
            onError={clearTurnstileToken}
            options={{ action: 'contact', theme: 'auto', size: 'flexible' }}
            className="max-w-2"
          />
        </div>
      </form>
    </div>
  );
}
