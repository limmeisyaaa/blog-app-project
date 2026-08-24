import { useEffect, useState } from 'react';
import { ProductCard, type ProductCardProps } from '@/components/cards/ProductCard'; 
import { products } from '@/data/side'; 
import { PageHeader } from '@/components/PageHeader';

const PAGE_SIZE = 6;
const productCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

export function CatalougePage() {
  const [items, setItems] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const timer = setTimeout(() => {      
      setItems(products as ProductCardProps[]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeCategory === 'All' ? items : items.filter((p) => p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Our Collection Figures" description="Price and short desc for product." />

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
              <p className="text-lg text-neutral-500">No products in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((product, index) => (
                  <ProductCard key={product.name + index} {...product} />
                ))}
              </div>
              
              {visibleCount < filtered.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite"
                  >
                    Load More Products
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