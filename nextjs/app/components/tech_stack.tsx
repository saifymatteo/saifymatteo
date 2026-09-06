import Marquee from '@/components/marquee';
import GradientBar from '@/components/gradient_bar';
import { ITEMS } from '@/lib/tech_stack';

export default function TechStack() {
  const items = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="w-full overflow-hidden">
      <GradientBar className="h-1.25" />
      <Marquee>
        {items.map((item, i) => (
          <span
            key={i}
            className="text-ink px-5 py-4 text-2xl font-semibold whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </Marquee>
      <GradientBar className="h-1.25" />
    </div>
  );
}
