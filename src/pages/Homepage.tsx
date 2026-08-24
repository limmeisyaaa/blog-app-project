import { useState } from "react";
import { ArrowRight, Quote, Star } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Link } from "react-router";
import { company, products, services, testimonials } from "@/data/side";
import type { BlogPost } from "@/types/blog";
import { SectionHeader } from "@/components/SectionHeader";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700";
const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite";
const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-neutral-800";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-neutral-100";

export function HomePage() {
  const [posts] = useState<BlogPost[]>([]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="container-page py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-electric">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Premium Action Figures & Collectibles
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
                Collect Characters.{" "}
                <span className="text-electric">Build Your World.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 text-balance">
                {company.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/catalouge" className={btnPrimary}>
                  Explore Our Collection
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/blog" className={btnOutline}>
                  Read Our Blog
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <p className="text-2xl font-extrabold text-ink">500+</p>
                  <p className="text-sm text-neutral-500">Products</p>
                </div>
                <div className="h-10 w-px bg-neutral-200" />
                <div>
                  <p className="text-2xl font-extrabold text-ink">10K+</p>
                  <p className="text-sm text-neutral-500">Collectors</p>
                </div>
                <div className="h-10 w-px bg-neutral-200" />
                <div>
                  <p className="text-2xl font-extrabold text-ink">20+</p>
                  <p className="text-sm text-neutral-500">Brands</p>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div
                className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-orange/20 blur-2xl"
                aria-hidden
              />
              <div
                className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-electric/20 blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-300/40">
                <img
                  src="https://images.pexels.com/photos/8000986/pexels-photo-8000986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Dynamic superhero action figure in a striking pose"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-icon-bg-orange text-icon-exclamation-orange">
                    <span className="text-lg font-black">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">New Drop</p>
                    <p className="text-xs text-neutral-400">
                      Iron Sentinel Mk. III
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Featured Products"
              title="Figures Worth the Shelf Space"
              description="A hand-picked selection of our latest and most sought-after action figures."
            />
            <Link to="/catalouge" className={`${btnGhost} shrink-0`}>
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* About / Brand Introduction */}
      <section className="border-y border-neutral-200 bg-white py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div
                className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl bg-electric/10"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200">
                <img
                  src="https://images.pexels.com/photos/16034963/pexels-photo-16034963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Hand placing a collectible figure on a display shelf"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="About FigureHome"
                title="Built by Collectors, for Collectors"
                description="We started FigureHome because we could not find a source that treated action figures with the respect they deserve. Every figure we stock is one we would proudly display ourselves."
              />
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="border-l-2 border-electric pl-4">
                  <p className="text-3xl font-extrabold text-ink">10+</p>
                  <p className="text-sm text-neutral-500">
                    Years of Experience
                  </p>
                </div>
                <div className="border-l-2 border-orange pl-4">
                  <p className="text-3xl font-extrabold text-ink">500+</p>
                  <p className="text-sm text-neutral-500">Products Curated</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/about" className={btnDark}>
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="From the Blog"
              title="Stories From the World of Collecting"
              description="Guides, reviews, and news for collectors at every level."
            />
            <Link to="/blog" className={`${btnGhost} shrink-0`}>
              Read All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="border-y border-neutral-200 bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Services"
            title="What We Do for Collectors"
            description="From retail to custom commissions, we cover every corner of the collecting world."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-icon-exclamation-orange">
              Collector Stories
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl text-balance">
              Trusted by Collectors Worldwide
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 text-balance">
              Real words from the people who know us best — the collectors who
              display our figures every day.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-xl hover:shadow-neutral-200/60"
              >
                <Quote
                  className="absolute right-6 top-6 h-8 w-8 text-neutral-200 transition-colors group-hover:text-electric/20"
                  aria-hidden
                />

                <div className="flex items-center gap-1 text-orange">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-neutral-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-neutral-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
