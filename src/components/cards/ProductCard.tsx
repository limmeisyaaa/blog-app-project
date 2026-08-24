import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export interface ProductCardProps {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

export function ProductCard({ name, category, description, price, image }: ProductCardProps) {
  const isComingSoon = price.toLowerCase().includes('coming');
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <span className="inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-offwhite">
            {category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className={`text-lg font-bold ${isComingSoon ? 'text-icon-exclamation-orange' : 'text-electric'}`}>
            {price}
          </span>
          {/*Link Ditambahkan jika telah membuat detail product*/}
          {/* <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-electric transition-colors group-hover:text-icon-exclamation-orange"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>
      </div>
    </article>
  );
}
