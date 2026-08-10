'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-[#696969] focus:border-blue dark:bg-transparent dark:text-white';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="text-ink text-3xl font-bold dark:text-white">
        Or reach me directly
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-ink flex flex-col gap-1.5 text-sm dark:text-white">
            Name
            <input
              name="name"
              required
              placeholder="John Doe"
              className={inputClass}
            />
          </label>
          <label className="text-ink flex flex-col gap-1.5 text-sm dark:text-white">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="john.doe@example.com"
              className={inputClass}
            />
          </label>
        </div>
        <label className="text-ink flex flex-col gap-1.5 text-sm dark:text-white">
          Subject
          <input
            name="subject"
            required
            placeholder="Opportunities"
            className={inputClass}
          />
        </label>
        <label className="text-ink flex flex-col gap-1.5 text-sm dark:text-white">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Let&#39;s create something together"
            className={inputClass}
          />
        </label>
        <div className="flex flex-col items-start gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-blue hover:bg-blue/90 inline-flex items-center gap-2 rounded-full px-8 py-3 text-xl font-medium text-white shadow-md transition-all duration-300 active:scale-95 disabled:opacity-60"
          >
            Submit <ArrowRight className="size-5" />
          </button>
          {status === 'sent' && (
            <p className="text-blue text-sm dark:text-white">
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
