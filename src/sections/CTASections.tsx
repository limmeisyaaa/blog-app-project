
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function CTASection() {
  return (
    <section className="bg-offwhite py-20 lg:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 lg:py-24">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange">
              Start Collecting
            </p>
            <h2 className="text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl text-balance">
              Discover Your Next Favorite Character.
            </h2>
            <p className="mt-5 text-lg text-neutral-300 text-balance">
              Browse our curated collection, read the blog, or get in touch about custom commissions.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700"
              >
                Explore the Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-sm shadow-orange/30 transition-colors hover:bg-orange-dark"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
