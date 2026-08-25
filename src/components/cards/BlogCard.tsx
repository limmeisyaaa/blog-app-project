import type { BlogPost } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";


export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-3xl border border-neutral-200 bg-white lg:grid-cols-2 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/60">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto">
          <img
            src={post.featured_image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-5 top-5">
            <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-offwhite">
              Featured
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-electric">
              {post.category}
            </span>
            <span className="text-xs text-neutral-500">{date}</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl text-balance">
            {post.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-sm font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{post.author}</p>
              <p className="text-xs text-neutral-500">{post.reading_time} min read</p>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-icon-exclamation-orange"
          >
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/60">
      <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={post.featured_image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <span className="inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-offwhite">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{date}</span>
          <span aria-hidden>•</span>
          <span>{post.reading_time} min read</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink text-balance">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-electric">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">
            {post.author.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-ink">{post.author}</p>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-electric transition-colors hover:text-icon-exclamation-orange"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
