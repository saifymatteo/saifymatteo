import FadeImage from '@/app/components/fade_image';

export default function BrandLogo({
  className = 'h-10',
  eager = false,
  alt = 'Saiful Mashuri',
}: {
  className?: string;
  eager?: boolean;
  alt?: string;
}) {
  return (
    <>
      <FadeImage
        src="/assets/logo/logo-dark.webp"
        loading={eager ? 'eager' : undefined}
        width={500}
        height={318}
        alt={alt}
        className={`flex w-auto dark:hidden ${className}`}
      />
      <FadeImage
        src="/assets/logo/logo-light.webp"
        loading={eager ? 'eager' : undefined}
        width={500}
        height={318}
        alt={alt}
        className={`hidden w-auto dark:flex ${className}`}
      />
    </>
  );
}
