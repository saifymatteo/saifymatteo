import Link from 'next/link';

export default function AppNotFoundPage() {
  return (
    <section className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="text-ink/70 text-lg dark:text-white/70">
        The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link
        href="/"
        className="bg-blue rounded-full px-6 py-2.5 text-xl font-medium text-white"
      >
        Back home
      </Link>
    </section>
  );
}
