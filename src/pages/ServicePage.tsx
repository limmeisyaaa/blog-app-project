import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { services } from '@/data/side';
import { PageHeader } from '@/components/PageHeader';

const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700';
const btnOutline = 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite';

export function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Our Services" title="Everything a Collector Needs" description="From retail to custom commissions, we cover every corner of the collecting world with care and expertise." />

      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.name} {...s} />)}
          </div>
        </div>
      </section>

      <section className="bg-offwhite pb-20 lg:pb-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center sm:px-12 lg:py-20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-electric/10 blur-3xl" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric">Partner With Us</p>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance">Looking for a Trusted Collectibles Partner?</h2>
              <p className="mt-5 text-lg text-neutral-600 text-balance">Whether you are a retailer, a studio, or a collector with a custom project in mind, we would love to hear from you.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/contact" className={btnPrimary}>Get in Touch <ArrowRight className="h-5 w-5" /></Link>
                <Link to="/about" className={btnOutline}>Learn About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
