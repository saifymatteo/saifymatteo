export default function GradientBar({
  className = 'h-2',
}: {
  className?: string;
}) {
  return <div className={`gradient-bar ${className}`} />;
}
