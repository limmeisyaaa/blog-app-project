import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { getPostBySlug } from '@/data/blogPosts';
import { marked } from 'marked';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchSinglePost() {
      setLoading(true);
      
      try {
        const response = await getPostBySlug(`${slug}`);
        setPost(response);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSinglePost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-20">
        <div className="h-96 animate-pulse rounded-2xl bg-neutral-100" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Article not found</h1>
        <p className="mt-4 text-neutral-600">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="mt-8 inline-block">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <>
      <article>
        <section className="border-b border-neutral-200 bg-offwhite">
          <div className="container-page py-12 lg:py-16">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-electric transition-colors hover:text-orange">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-electric">{post.category}</span>
                <span className="text-sm text-neutral-500">{date}</span>
                <span className="text-sm text-neutral-500">• {post.reading_time} min read</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl text-balance">{post.title}</h1>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-sm font-bold text-white">{post.author.charAt(0)}</div>
                <div><p className="text-sm font-semibold text-ink">{post.author}</p><p className="text-xs text-neutral-500">Author</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-page py-8">
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <img src={post.featured_image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-offwhite pb-20">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              {post.excerpt && (
                <p className="mb-8 border-l-4 border-electric pl-4 text-lg font-medium italic leading-relaxed text-neutral-700">{post.excerpt}</p>
              )}
              <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.content ? marked.parse(post.content) as string : '' }} />
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200 pt-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}