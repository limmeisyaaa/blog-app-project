import { Link } from 'react-router';
import { ArrowRight, Target, Eye } from 'lucide-react';
import * as Icons from 'lucide-react';
import { stats, values } from '@/data/side';
import { SectionHeader } from '@/components/SectionHeader';

const btnDark = 'inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-neutral-800';

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-offwhite">
        <div className="container-page py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric">About Us</p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
                We Turn Characters Into <span className="text-electric">Collectibles.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 text-balance">
                FigureHome is a premium action figure company built by people who have been collecting since childhood. We believe a great figure is more than a product — it is a piece of the stories we love.
              </p>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-orange/20 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-300/40">
                <img src="https://images.pexels.com/photos/6342784/pexels-photo-6342784.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Packed collectible figures in a souvenir shop" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader eyebrow="Our Story" title="From a Bedroom Shelf to a Global Community" />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>FigureHome started in 2026 when our founder, Meisya Halim, turned a lifelong obsession with action figures into a small online store. What began as a side project run from a bedroom shelf quickly grew into a trusted source for collectors across the country.</p>
                <p>A decade later, we partner with major studios and independent artists alike, curating figures that meet our exacting standards. Our mission is simple: treat every figure with the respect it deserves, and treat every collector like a fellow enthusiast.</p>
                <p>Today, FigureHome serves over 10,000 collectors worldwide, but we have never lost the spirit of that first bedroom shelf — passion first, always.</p>
              </div>
              <div className="mt-8">
                <Link to="/teams" className={btnDark}>Meet the Team <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl bg-electric/10" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200">
                <img src="https://images.pexels.com/photos/4061668/pexels-photo-4061668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Display of collectible figures and memorabilia" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric"><Target className="h-7 w-7" /></div>
              <h3 className="mt-6 text-2xl font-bold text-ink">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">To be the most trusted source for premium action figures and collectibles — by curating quality, championing authenticity, and building a community where every collector feels at home.</p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-ink p-8 text-offwhite lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/20 text-orange"><Eye className="h-7 w-7" /></div>
              <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-300">A world where collecting is celebrated as an art form — where every figure tells a story, every shelf is a gallery, and every collector is part of a global, passionate community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Our Values" title="What We Stand For" description="The principles that guide every figure we curate and every decision we make." align="center" className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[v.icon] ?? Icons.Award;
              return (
                <div key={v.title} className="group rounded-2xl border border-neutral-200 bg-offwhite p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-white"><Icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 text-base font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-5xl font-extrabold text-offwhite lg:text-6xl">{s.value}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
