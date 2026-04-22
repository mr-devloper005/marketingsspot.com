import Link from 'next/link'
import { ArrowRight, BedDouble, Bath, Building2, ChevronRight, Compass, Heart, Home as HomeIcon, MapPin, Maximize, Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, TrendingUp } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_IMG = '/placeholder.svg?height=600&width=900'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const c = post?.content && typeof post.content === 'object' ? (post.content as any) : {}
  const contentImage = Array.isArray(c.images) ? c.images.find((u: unknown) => typeof u === 'string' && u) : null
  return mediaUrl || contentImage || c.image || c.logo || FALLBACK_IMG
}

function getPostMeta(post: SitePost, index: number) {
  const c = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  const priceRaw = c.price
  const price =
    typeof priceRaw === 'number'
      ? `$${priceRaw.toLocaleString()}`
      : typeof priceRaw === 'string' && priceRaw
        ? (priceRaw.startsWith('$') ? priceRaw : `$${priceRaw}`)
        : `$${(450000 + index * 82500).toLocaleString()}`
  return {
    location: c.address || c.location || c.city || 'Beverly Hills, CA',
    category: c.category || (post.tags && post.tags[0]) || 'Residential',
    price,
    beds: c.beds ?? c.bedrooms ?? (3 + (index % 3)),
    baths: c.baths ?? c.bathrooms ?? (2 + (index % 2)),
    area: c.area || c.sqft || `${(1800 + index * 180).toLocaleString()} sqft`,
    badge: c.badge || (post.tags && post.tags[1]) || (index % 4 === 0 ? 'New' : index % 3 === 0 ? 'Hot Deal' : index % 2 === 0 ? 'Featured' : 'For Sale'),
  }
}

const PROPERTY_FALLBACK: SitePost[] = [
  { id: 'fl1', slug: 'modern-hillside-villa', title: 'Modern Hillside Villa', summary: 'A serene retreat with panoramic city views, open living, and sun-soaked terraces.', content: { images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'], price: 1250000, beds: 4, baths: 3, area: '3,200 sqft', location: 'Beverly Hills, CA', category: 'Villa', badge: 'Featured' }, tags: ['Villa'], media: [] } as any,
  { id: 'fl2', slug: 'coastal-family-home', title: 'Coastal Family Home', summary: 'Bright open spaces just minutes from the beach with a private landscaped garden.', content: { images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'], price: 890000, beds: 5, baths: 4, area: '2,850 sqft', location: 'Santa Monica, CA', category: 'House', badge: 'New' }, tags: ['House'], media: [] } as any,
  { id: 'fl3', slug: 'downtown-loft-suite', title: 'Downtown Loft Suite', summary: 'High ceilings, exposed brick, and walkable access to the best of downtown.', content: { images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'], price: 675000, beds: 2, baths: 2, area: '1,450 sqft', location: 'Los Angeles, CA', category: 'Loft', badge: 'Hot Deal' }, tags: ['Loft'], media: [] } as any,
  { id: 'fl4', slug: 'suburban-garden-estate', title: 'Suburban Garden Estate', summary: 'Spacious living with manicured gardens, a private pool, and a three-car garage.', content: { images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'], price: 1420000, beds: 6, baths: 5, area: '4,100 sqft', location: 'Pasadena, CA', category: 'Estate', badge: 'For Sale' }, tags: ['Estate'], media: [] } as any,
  { id: 'fl5', slug: 'lakeside-cottage', title: 'Lakeside Cottage', summary: 'Charming retreat by the water, perfect for weekend escapes and slow mornings.', content: { images: ['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80'], price: 540000, beds: 3, baths: 2, area: '1,800 sqft', location: 'Lake Arrowhead, CA', category: 'Cottage', badge: 'Featured' }, tags: ['Cottage'], media: [] } as any,
  { id: 'fl6', slug: 'penthouse-skyview', title: 'Penthouse Skyview', summary: 'Luxury penthouse with floor-to-ceiling windows and a private rooftop terrace.', content: { images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'], price: 2100000, beds: 4, baths: 4, area: '3,600 sqft', location: 'Downtown LA', category: 'Penthouse', badge: 'Premium' }, tags: ['Penthouse'], media: [] } as any,
  { id: 'fl7', slug: 'sunset-ranch', title: 'Sunset Ranch Retreat', summary: 'Rolling acreage, warm wood interiors, and a wraparound porch made for golden hour.', content: { images: ['https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80'], price: 985000, beds: 4, baths: 3, area: '3,100 sqft', location: 'Malibu, CA', category: 'Ranch', badge: 'New' }, tags: ['Ranch'], media: [] } as any,
  { id: 'fl8', slug: 'urban-townhouse', title: 'Urban Townhouse', summary: 'Three stories of smart design in a walkable, tree-lined neighborhood.', content: { images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'], price: 720000, beds: 3, baths: 3, area: '2,100 sqft', location: 'Culver City, CA', category: 'Townhouse', badge: 'For Sale' }, tags: ['Townhouse'], media: [] } as any,
  { id: 'fl9', slug: 'hilltop-contemporary', title: 'Hilltop Contemporary', summary: 'Clean lines, skylights, and a seamless indoor-outdoor flow with canyon views.', content: { images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'], price: 1680000, beds: 5, baths: 4, area: '3,900 sqft', location: 'Hollywood Hills, CA', category: 'Villa', badge: 'Featured' }, tags: ['Villa'], media: [] } as any,
]

const CATEGORIES = [
  { key: 'all', label: 'All Properties' },
  { key: 'house', label: 'Houses' },
  { key: 'villa', label: 'Villas' },
  { key: 'apartment', label: 'Apartments' },
  { key: 'loft', label: 'Lofts' },
  { key: 'estate', label: 'Estates' },
  { key: 'cottage', label: 'Cottages' },
  { key: 'townhouse', label: 'Townhouses' },
  { key: 'penthouse', label: 'Penthouses' },
]

const PRICE_RANGES = ['Any Price', 'Under $500K', '$500K – $1M', '$1M – $2M', '$2M+']
const BED_OPTIONS = ['Any Beds', '1+', '2+', '3+', '4+', '5+']

function PropertyCard({ post, index }: { post: SitePost; index: number }) {
  const meta = getPostMeta(post, index)
  const image = getPostImage(post)
  return (
    <Link
      href={`/listings/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
    >
      <div className="relative h-60 overflow-hidden">
        <ContentImage src={image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-900 shadow-sm">
          {meta.badge}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-[#4E56C0] px-3 py-1 text-[12px] font-semibold text-white shadow-sm">
          {meta.price}
        </span>
        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-[#4E56C0]">
          <Heart className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#4E56C0]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#4E56C0]">
            {meta.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {meta.location}
          </div>
        </div>
        <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#4E56C0]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{post.summary || 'A lovingly cared-for property ready for its next chapter.'}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#4E56C0]" />{meta.beds} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[#4E56C0]" />{meta.baths} Baths</span>
          <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-[#4E56C0]" />{meta.area}</span>
        </div>
      </div>
    </Link>
  )
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  if (task !== 'listing') {
    return null
  }

  const fetched = await fetchTaskPosts(task, 30, { allowMockFallback: false, fresh: true }).catch(() => [] as SitePost[])
  const posts = fetched.length ? fetched : PROPERTY_FALLBACK
  const featured = posts.slice(0, 3)
  const rest = posts.slice(3)
  const selectedCategory = (category || 'all').toLowerCase()

  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${baseUrl}/listings/${p.slug}`,
    name: p.title,
  }))

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />
      <SchemaJsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: schemaItems }} />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
              alt="Properties"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <Building2 className="h-3.5 w-3.5" /> Browse Listings
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                Find the property that fits your life.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                Thousands of verified homes, villas, apartments, and commercial spaces curated by our local property advisors.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/create/listing" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] shadow-lg transition-colors hover:bg-slate-100">
                  <Plus className="h-4 w-4" />
                  Create Listing
                </Link>
                <Link href="#all-listings" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  Browse below <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/90"><ShieldCheck className="h-4 w-4 text-[#FDCFFA]" /> Verified listings</div>
                <div className="flex items-center gap-2 text-white/90"><Sparkles className="h-4 w-4 text-[#FDCFFA]" /> New every week</div>
                <div className="flex items-center gap-2 text-white/90"><TrendingUp className="h-4 w-4 text-[#FDCFFA]" /> Updated prices</div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#4E56C0] focus-within:bg-white">
                <Search className="h-4 w-4 text-slate-400" />
                <input className="w-full bg-transparent text-sm focus:outline-none" placeholder="Search by address, city, or ZIP" />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Compass className="h-4 w-4 text-slate-400" />
                <select className="w-full cursor-pointer bg-transparent text-sm focus:outline-none">
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <select className="w-full cursor-pointer bg-transparent text-sm focus:outline-none">
                  {PRICE_RANGES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <BedDouble className="h-4 w-4 text-slate-400" />
                <select className="w-full cursor-pointer bg-transparent text-sm focus:outline-none">
                  {BED_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {featured.length ? (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Handpicked</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Featured properties this week</h2>
              </div>
              <span className="text-sm text-slate-500">{posts.length} total listings available</span>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <PropertyCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </section>
        ) : null}

        <section id="all-listings" className="scroll-mt-24 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Browse by type</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">All Listings</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                  Filter by category, price, or bedrooms. Every listing is verified by our team before it goes live.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/create/listing" className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#3f4aa8]">
                  <Plus className="h-4 w-4" />
                  Create Listing
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  <SlidersHorizontal className="h-4 w-4 text-[#4E56C0]" />
                  Sort: <span className="font-semibold text-slate-900">Newest</span>
                  <ChevronRight className="h-4 w-4 rotate-90 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const isActive = selectedCategory === c.key || (selectedCategory === 'all' && c.key === 'all')
                const href = c.key === 'all' ? '/listings' : `/listings?category=${c.key}`
                return (
                  <Link
                    key={c.key}
                    href={href}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'border-[#4E56C0] bg-[#4E56C0] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]'}`}
                  >
                    {c.label}
                  </Link>
                )
              })}
            </div>

            {rest.length ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <PropertyCard key={p.id} post={p} index={i + 3} />
                ))}
              </div>
            ) : (
              <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">No more listings in this view</h3>
                <p className="mt-2 max-w-md text-sm text-slate-600">
                  Try changing your filters or check back soon — we add new listings every week.
                </p>
              </div>
            )}

            {posts.length >= 6 ? (
              <div className="mt-12 flex items-center justify-center gap-2">
                {['1', '2', '3', '…', '12'].map((p, i) => (
                  <button
                    key={i}
                    className={`h-10 min-w-[40px] rounded-xl px-3 text-sm font-semibold ${p === '1' ? 'bg-[#4E56C0] text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]'}`}
                  >
                    {p}
                  </button>
                ))}
                <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Why list with us</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">The best place to find your next home</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Verified listings', text: 'Every property is reviewed by our team before publishing.' },
              { icon: TrendingUp, title: 'Live pricing', text: 'Prices are kept current so you never chase stale numbers.' },
              { icon: Star, title: 'Top-rated agents', text: 'Connect with advisors who consistently earn 4.8+ stars.' },
              { icon: Sparkles, title: 'Smart search', text: 'Filters, alerts, and saved searches that actually help.' },
            ].map((f) => (
              <div key={f.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0] transition-colors group-hover:bg-[#4E56C0] group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] p-10 text-white shadow-2xl sm:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Selling your property?</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
                  List with {SITE_CONFIG.name} and reach serious buyers in days, not weeks. We'll handle the photos, paperwork, and marketing.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                    Add Your Listing <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                    Talk to an Agent
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80" alt="House" className="h-64 w-full rounded-2xl object-cover shadow-xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
