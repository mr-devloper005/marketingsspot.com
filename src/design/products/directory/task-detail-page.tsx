import Link from 'next/link'
import { ExternalLink, Globe, Mail, MapPin, Phone, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { PhotosLightbox } from '@/components/tasks/photos-lightbox'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const serviceLabel = typeof content.category === 'string' ? content.category : category
  const mapLocationLabel = location || 'Location details unavailable'
  const overview = [
    { label: 'Budget', value: '< 1,000' },
    { label: 'Rate', value: '<$25 / hr' },
    { label: 'Team Size', value: '10 - 49' },
    { label: 'Region', value: 'FL' },
  ]
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#eef2f7] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main>
        <section className="bg-[#313d59] py-10 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-slate-200">
              <Link href="/" className="underline decoration-white/30 underline-offset-2 hover:text-white">Home</Link>
              <span className="mx-2">&gt;</span>
              <Link href={taskRoute} className="underline decoration-white/30 underline-offset-2 hover:text-white">{taskLabel}</Link>
              <span className="mx-2">&gt;</span>
              <span className="font-semibold text-white">{post.title}</span>
            </div>

            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white/80 bg-slate-200">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-semibold leading-tight">{post.title}</h1>
                <h2 className="mt-8 text-2xl font-semibold">Grab Hot Deals on {serviceLabel} Today</h2>
                <RichContent html={descriptionHtml} className="mt-3 max-w-5xl text-sm leading-7 text-slate-100 prose-invert" />
                <div className="mt-8 inline-flex flex-wrap gap-2 rounded-xl bg-white p-2 text-sm text-slate-900">
                  <a href="#about" className="rounded-md bg-slate-500 px-5 py-2 font-semibold text-white">
                    About
                  </a>
                  <a href="#our-work" className="rounded-md px-5 py-2 font-semibold text-slate-900">
                    Our Work
                  </a>
                  <a href="#reviews" className="rounded-md px-5 py-2 font-semibold text-slate-900">
                    Reviews
                  </a>
                  <a href="#location" className="rounded-md px-5 py-2 font-semibold text-slate-900">
                    Location
                  </a>
                  <a href="#photos" className="rounded-md px-5 py-2 font-semibold text-slate-900">
                    Photos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#313d59] px-4 py-2 text-sm font-semibold text-white"
              >
                {website.replace(/^https?:\/\//, '')}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {phone ? <p className="mt-4 text-2xl font-semibold text-[#2f3d5f]">{phone}</p> : null}

            <h3 id="our-work" className="mt-8 scroll-mt-24 text-4xl font-semibold text-[#2f3d5f]">Services Provided</h3>
            <span className="mt-4 inline-flex rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-900">{serviceLabel}</span>

            <h3 id="about" className="mt-8 scroll-mt-24 text-4xl font-semibold text-[#2f3d5f]">About {post.title}</h3>
            <RichContent html={descriptionHtml} className="mt-3 text-base leading-8 text-slate-700" />

            {highlights.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {highlights.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            <h3 id="reviews" className="mt-8 scroll-mt-24 text-4xl font-semibold text-[#2f3d5f]">Business Overview</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {overview.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{item.label}</p>
                  <p className="mt-1 text-xl font-semibold text-[#2f3d5f]">{item.value}</p>
                </div>
              ))}
            </div>

            <h3 id="photos" className="mt-8 scroll-mt-24 text-4xl font-semibold text-[#2f3d5f]">Photos</h3>
            <PhotosLightbox images={images} title={post.title} />
          </div>

          {mapEmbedUrl ? (
            <div id="location" className="relative mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
              <iframe
                src={mapEmbedUrl}
                title={`${post.title} map`}
                className="h-[500px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5ba8c5]/10 via-transparent to-[#5ba8c5]/10" />
              <div className="absolute right-6 top-6 w-full max-w-md rounded-2xl border border-slate-300 bg-white/95 p-6 text-slate-800 shadow-xl">
                <h3 className="border-b border-slate-300 pb-2 text-3xl font-semibold text-[#2f3d5f]">Location(s)</h3>
                <p className="mt-3 text-sm font-semibold">FL</p>
                <p className="text-sm">{mapLocationLabel}</p>
                {website ? <p className="mt-2 flex items-center gap-2 text-sm"><Globe className="h-4 w-4" /> {website.replace(/^https?:\/\//, '')}</p> : null}
                {phone ? <p className="mt-1 flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> {phone}</p> : null}
                {email ? <p className="mt-1 flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> {email}</p> : null}
                {!phone && !website && !email ? (
                  <p className="mt-2 flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> Contact Provider</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        {related.length ? (
          <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 border-b border-slate-300 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-2 text-3xl font-semibold text-[#2f3d5f]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

