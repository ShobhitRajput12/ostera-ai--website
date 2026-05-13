import React from 'react';
import OsteraLogo from './OsteraLogo';
import ThemeToggle from './ui/ThemeToggle';

function renderContentBlock(block, index) {
  if (block.type === 'paragraph') {
    return (
      <p key={index} className="text-base leading-8 text-foreground/78 md:text-lg">
        {block.text}
      </p>
    );
  }

  if (block.type === 'bullets') {
    return (
      <ul key={index} className="space-y-3 pl-5 text-base leading-8 text-foreground/78 marker:text-violet-400 md:text-lg">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'contact') {
    return (
      <div
        key={index}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-base leading-8 text-foreground/78 dark:border-white/10 dark:bg-white/[0.04] md:text-lg"
      >
        {block.lines.map((line) => (
          <p key={line} className={line.emphasis ? 'font-semibold text-foreground' : ''}>
            {line.text || line}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

export default function LegalPageLayout({
  eyebrow = 'Legal',
  title,
  subtitle,
  effectiveDate,
  metaCards = [],
  sections = [],
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, var(--background) 0%, color-mix(in srgb, var(--background) 94%, #6d28d9 6%) 100%)',
        }}
      />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.10),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.03),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.14),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/72 backdrop-blur-xl dark:border-white/10 dark:bg-[#08050d]/72">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <a href="/" className="inline-flex items-center">
            <OsteraLogo showText markClassName="h-10 w-auto sm:h-11" textClassName="text-base sm:text-lg" />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] sm:inline-flex"
            >
              Back to Home
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-black/8 bg-white/[0.72] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_340px] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-violet-500 dark:text-violet-300">
                {eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/70 md:text-xl">
                {subtitle}
              </p>
              <div className="mt-8 inline-flex rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-foreground/72 dark:border-white/10 dark:bg-white/[0.05]">
                Effective Date: {effectiveDate}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {metaCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-black/8 bg-gradient-to-br from-white/95 to-white/75 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.03]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500/80 dark:text-violet-300/80">
                    {card.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/68">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-black/8 bg-white/[0.72] p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-violet-500 dark:text-violet-300">
                On This Page
              </p>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-2xl px-3 py-3 text-sm font-medium text-foreground/68 transition-colors hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]"
                  >
                    <span className="mr-2 text-violet-500 dark:text-violet-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-28 rounded-[1.75rem] border border-black/8 bg-white/[0.78] p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] md:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500/80 dark:text-violet-300/80">
                      Section
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-5">
                  {section.blocks.map((block, index) => renderContentBlock(block, index))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
