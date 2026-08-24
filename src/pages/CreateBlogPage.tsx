import { useState, useRef, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Bold, Italic, Heading2, List, ListOrdered, Quote, Link as LinkIcon,
  Image as ImageIcon, Send, ArrowLeft, X,
} from 'lucide-react';
import { useAuth } from '@/stores/useAuth';
import { blogCategories } from '@/data/side';
import axios from 'axios';

const SAMPLE_IMAGE = 'https://images.pexels.com/photos/7258489/pexels-photo-7258489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const fieldClass = 'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700 disabled:opacity-50';

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function CreateBlogPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState(blogCategories[1]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(user?.email ?? '');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState(SAMPLE_IMAGE);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const wrapSelection = (before: string, after: string = before) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || 'text';
    const newContent = content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newContent);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const newContent = content.substring(0, lineStart) + prefix + content.substring(lineStart);
    setContent(newContent);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    });
  };

  const insertImage = () => {
    const url = window.prompt('Enter image URL');
    if (!url) return;
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const tag = `<img src="${url}" alt="Image" />`;
    setContent(content.substring(0, start) + tag + content.substring(textarea.selectionEnd));
  };

  const insertLink = () => {
    const url = window.prompt('Enter URL');
    if (!url) return;
    wrapSelection('<a href="' + url + '">', '</a>');
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => wrapSelection('**') },
    { icon: Italic, label: 'Italic', action: () => wrapSelection('*') },
    { icon: Heading2, label: 'Heading', action: () => insertLinePrefix('## ') },
    { icon: List, label: 'Bullet list', action: () => insertLinePrefix('- ') },
    { icon: ListOrdered, label: 'Numbered list', action: () => insertLinePrefix('1. ') },
    { icon: Quote, label: 'Quote', action: () => insertLinePrefix('> ') },
    { icon: LinkIcon, label: 'Link', action: insertLink },
    { icon: ImageIcon, label: 'Image', action: insertImage },
  ];

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be logged in to create a blog post.');
      return;
    }

    const finalSlug = slug.trim() || slugify(title);

    // Validasi Input
    if (!title.trim()) { setError('Title cannot be empty.'); return; }
    if (!finalSlug) { setError('Slug cannot be empty.'); return; }
    if (!category.trim()) { setError('Category cannot be empty.'); return; }
    if (!excerpt.trim()) { setError('Excerpt cannot be empty.'); return; }
    if (!content.trim()) { setError('Content cannot be empty.'); return; }
    if (!author.trim()) { setError('Author cannot be empty.'); return; }

    setSaving(true);
    const payload = {
      title,
      slug: finalSlug,
      category,
      excerpt: excerpt || title,
      content,
      featured_image: featuredImage,
      author: author || user.email,
      tags: tags,
      status: 'published',
      reading_time: estimateReadingTime(content),
    };

    try {
      await axios.post('https://manlygrip-us.backendless.app/api/data/BlogPosts', payload);

      setSaving(false);
      navigate(`/blog/${finalSlug}`);
    } catch (err) {
      setSaving(false);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Failed to save date. Check your conection.';
        setError(errorMessage);
      } else {
        setError('Unexpected Failure.');
      }
    }
  };

  if (!user) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Login Required</h1>
        <p className="mt-4 text-neutral-600">You need to be logged in to create a blog post.</p>
        <Link to="/login" className="mt-8 inline-block">
          <button className={btnPrimary}>Go to Login</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-neutral-200 bg-offwhite">
        <div className="container-page py-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-electric transition-colors hover:text-orange">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Create New Post</h1>
          <p className="mt-2 text-neutral-600">Write, edit, and publish a new article for the Figureform blog.</p>
        </div>
      </section>

      <section className="bg-offwhite py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              <form onSubmit={handlePost} className="space-y-6">
                <div>
                  <label htmlFor="title" className={labelClass}>Blog Title</label>
                  <input id="title" type="text" required value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="The Art of Articulation..." className={fieldClass} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="slug" className={labelClass}>Slug</label>
                    <input id="slug" type="text" required value={slug} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} placeholder="art-of-articulation" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="category" className={labelClass}>Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundPosition: 'right 1rem center', backgroundSize: '12px', backgroundRepeat: 'no-repeat', paddingRight: '2.5rem' }}>
                      {blogCategories.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className={labelClass}>Short Excerpt</label>
                  <input id="excerpt" required type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A brief summary of your article..." className={fieldClass} />
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 rounded-t-xl border border-b-0 border-neutral-300 bg-neutral-50 p-2">
                    {toolbarButtons.map((btn) => (
                      <button key={btn.label} type="button" onClick={btn.action} className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-ink hover:text-offwhite" title={btn.label} aria-label={btn.label}>
                        <btn.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  <textarea ref={editorRef} required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start writing your article..." className="min-h-[400px] w-full resize-y rounded-b-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-neutral-400 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20" />
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <button type="submit" className={btnPrimary} disabled={saving}>
                    <Send className="h-4 w-4" />
                    {saving ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Featured Image</h3>
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
                  <img src={featuredImage} alt="Featured" className="aspect-[16/10] w-full object-cover" />
                </div>
                <input type="text" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="Image URL" className={`${fieldClass} mt-3`} />
                <button type="button" onClick={() => setFeaturedImage(SAMPLE_IMAGE)} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-electric hover:text-orange">
                  <X className="h-3 w-3" />
                  Reset to default
                </button>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
                <div>
                  <label htmlFor="author" className={labelClass}>Author</label>
                  <input id="author" required type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="tags" className={labelClass}>Tags (comma separated)</label>
                  <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="reviews, guides" className={fieldClass} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
