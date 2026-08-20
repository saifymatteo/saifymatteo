'use client';

import { buttonVariants } from '@/components/button_variants';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const className =
    'w-full rounded-xl border border-primary-foreground bg-primary-background px-4 py-3 text-sm text-primary-foreground outline-none placeholder:text-[#696969] focus:border-blue';

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="content-max-width-slim">
      <h2 className="text-primary-foreground text-3xl font-bold">
        Or reach me directly
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-primary-foreground flex flex-col gap-1.5 text-sm">
            Name
            <input
              name="name"
              required
              placeholder="John Doe"
              className={className}
            />
          </label>
          <label className="text-primary-foreground flex flex-col gap-1.5 text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="john.doe@example.com"
              className={className}
            />
          </label>
        </div>
        <label className="text-primary-foreground flex flex-col gap-1.5 text-sm">
          Subject
          <input
            name="subject"
            required
            placeholder="Opportunities"
            className={className}
          />
        </label>
        <label className="text-primary-foreground flex flex-col gap-1.5 text-sm">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Let&#39;s create something together"
            className={className}
          />
        </label>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={status === 'sending'}
            className={buttonVariants({ variant: 'blue' })}
          >
            Submit <ArrowRight className="button-arrow-slide size-5" />
          </button>
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
        </div>
      </form>
    </div>
  );
}
