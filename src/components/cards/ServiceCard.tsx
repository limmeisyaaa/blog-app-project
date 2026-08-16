import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  showLink?: boolean;
}

export function ServiceCard({ icon, name, description, showLink = true }: ServiceCardProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] ?? Icons.Sparkles;
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-xl hover:shadow-neutral-200/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      {showLink && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-electric transition-colors group-hover:text-orange">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </article>
  );
}
