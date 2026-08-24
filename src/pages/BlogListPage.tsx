import { useEffect, useState } from 'react';
import { BlogCard } from '@/components/cards/BlogCard';
import type { BlogPost } from '@/types/blog';
import { getBlogPosts } from '@/data/blogPosts';
import { useAuth } from '@/stores/useAuth';
import { Link } from 'react-router';

const PAGE_SIZE = 6;
const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700 disabled:opacity-50';

function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="border-b border-neutral-200 bg-offwhite">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric">{eyebrow}</p>}
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">{title}</h1>
          {description && <p className="mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl text-balance">{description}</p>}
        </div>
      </div>
    </section>
  );
}

export function BlogListPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true); 
  
      try {
        const data = await getBlogPosts(); 
        setPosts(data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false); 
      }
    }
    fetchPosts();
  }, []);

  const productCategories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const featured = filtered[0];
  const rest = filtered.slice(1, visibleCount);

  if (!user) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Login Required</h1>
        <p className="mt-4 text-neutral-600">You need to be logged in to access to blog.</p>
        <Link to="/login" className="mt-8 inline-block">
          <button className={btnPrimary}>Go to Login</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Blog" title="Stories From the World of Collecting" description="Guides, reviews, news, and behind-the-scenes stories for collectors at every level." />

      <section className="border-b border-neutral-200 bg-offwhite">
        <div className="container-page py-6">
          <div className="flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-ink text-offwhite' : 'border border-neutral-200 bg-white text-ink hover:border-electric hover:text-electric'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-neutral-500">No articles in this category yet.</p>
            </div>
          ) : (
            <>
              {activeCategory === 'All' && featured && (
                <div className="mb-12"><BlogCard post={featured} featured /></div>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(activeCategory === 'All' ? rest : visible).map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}