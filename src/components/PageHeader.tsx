export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
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