import * as Icons from 'lucide-react';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
}

export function ServiceCard({ icon, name, description }: ServiceCardProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] ?? Icons.Sparkles;
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 ">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
    </article>
  );
}
