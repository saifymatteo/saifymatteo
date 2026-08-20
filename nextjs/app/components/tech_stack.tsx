import { ITEMS } from '@/lib/tech_stack';

export default function TechStack() {
  const marquee = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="w-full overflow-hidden">
      <div className="gradient-bar h-1.25" />
      <div className="animate-marquee hover:paused flex w-max">
        {marquee.map((item, i) => (
          <span
            key={i}
            className="text-primary-foreground px-5 py-4 text-2xl font-medium whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="gradient-bar h-1.25" />
    </div>
  );
}
