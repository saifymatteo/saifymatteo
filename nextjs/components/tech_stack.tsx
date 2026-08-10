const ITEMS = [
  'Flutter',
  'Dart',
  'React',
  'Typescript',
  'NextJS',
  'Vite',
  'Docker',
  'CI/CD',
  'Playwright',
  'Figma',
  'Affinity',
];

export default function TechStack() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="w-full overflow-hidden">
      <div className="from-blue to-blue-light h-1.25 w-full bg-linear-to-r" />
      <div className="animate-marquee flex w-max gap-16 px-10 py-4 hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-ink text-3xl font-medium whitespace-nowrap dark:text-white"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="from-blue to-blue-light h-1.25 w-full bg-linear-to-r" />
    </div>
  );
}
