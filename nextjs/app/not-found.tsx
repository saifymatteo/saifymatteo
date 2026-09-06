import { buttonVariants } from '@/components/button_variants';
import Link from 'next/link';

export default function AppNotFoundPage() {
  return (
    <section className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="text-ink text-lg">
        The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link href="/" className={buttonVariants({ variant: 'blue' })}>
        Back home
      </Link>
    </section>
  );
}
