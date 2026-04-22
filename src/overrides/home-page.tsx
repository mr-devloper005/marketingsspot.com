import Link from 'next/link'
import { ArrowRight, MapPin, BedDouble, Bath, Maximize, Search, Star, Phone, Mail, ShieldCheck, Award, Users, Home as HomeIcon, ChevronRight, Quote } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_IMG = '/placeholder.svg?height=600&width=900'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const c = post?.content && typeof post.content === 'object' ? (post.content as any) : {}
  const contentImage = Array.isArray(c.images) ? c.images.find((u: unknown) => typeof u === 'string' && u) : null
  return mediaUrl || contentImage || c.image || c.logo || FALLBACK_IMG
}

function getPostMeta(post?: SitePost | null) {
  const c = post?.content && typeof post.content === 'object' ? (post.content as any) : {}
  const price = typeof c.price === 'string' || typeof c.price === 'number' ? `$${c.price}` : '$' + (450000 + ((post?.id?.length || 3) * 17500)).toLocaleString()
  return {
    location: c.address || c.location || c.city || 'Beverly Hills, CA',
    category: c.category || (post?.tags && post.tags[0]) || 'Featured',
    price,
    beds: c.beds || c.bedrooms || 4,
    baths: c.baths || c.bathrooms || 3,
    area: c.area || c.sqft || '2,400 sqft',
    badge: c.badge || (post?.tags && post.tags[1]) || 'For Sale',
  }
}

const HERO_BG = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80'

const PROPERTY_FALLBACK = [
  { id: 'p1', title: 'Modern Hillside Villa', slug: 'modern-hillside-villa', summary: 'A serene retreat with panoramic city views and contemporary design.', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', price: '$1,250,000', beds: 4, baths: 3, area: '3,200 sqft', location: 'Beverly Hills, CA', badge: 'For Sale' },
  { id: 'p2', title: 'Coastal Family Home', slug: 'coastal-family-home', summary: 'Bright open spaces just minutes from the beach with a private garden.', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80', price: '$890,000', beds: 5, baths: 4, area: '2,850 sqft', location: 'Santa Monica, CA', badge: 'New' },
  { id: 'p3', title: 'Downtown Loft Suite', slug: 'downtown-loft-suite', summary: 'High ceilings, exposed brick, and walkable access to the best of downtown.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', price: '$675,000', beds: 2, baths: 2, area: '1,450 sqft', location: 'Los Angeles, CA', badge: 'Featured' },
  { id: 'p4', title: 'Suburban Garden Estate', slug: 'suburban-garden-estate', summary: 'Spacious living with manicured gardens and a private pool.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', price: '$1,420,000', beds: 6, baths: 5, area: '4,100 sqft', location: 'Pasadena, CA', badge: 'For Sale' },
  { id: 'p5', title: 'Lakeside Cottage', slug: 'lakeside-cottage', summary: 'Charming retreat by the water, perfect for weekend escapes.', img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80', price: '$540,000', beds: 3, baths: 2, area: '1,800 sqft', location: 'Lake Arrowhead, CA', badge: 'Hot Deal' },
  { id: 'p6', title: 'Penthouse Skyview', slug: 'penthouse-skyview', summary: 'Luxury penthouse with floor-to-ceiling windows and a rooftop terrace.', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', price: '$2,100,000', beds: 4, baths: 4, area: '3,600 sqft', location: 'Downtown LA', badge: 'Premium' },
]

const AGENTS = [
  { name: 'Daniel Carter', role: 'Senior Property Advisor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sophia Reyes', role: 'Luxury Homes Specialist', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marcus Chen', role: 'Investment Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Elena Brooks', role: 'Residential Expert', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80' },
]

const TESTIMONIALS = [
  { name: 'Olivia Bennett', role: 'Homeowner', text: 'They guided us through every step. We found our dream home in under a month and the process felt effortless.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { name: 'James Thornton', role: 'Property Investor', text: 'Professional, transparent, and deeply knowledgeable about the local market. Highly recommended.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Priya Sharma', role: 'First-time Buyer', text: 'They made buying my first home stress-free. The team truly listens and delivers beyond expectations.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
]

const ARTICLES = [
  { title: '7 things to check before buying your next home', summary: 'A practical buyer checklist to avoid surprises and negotiate confidently.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Staging tips that help homes sell faster', summary: 'Simple, low-cost ideas to make every room shine in listing photos.', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80' },
  { title: '2026 market outlook: where prices are heading', summary: 'Our agents share insights on neighborhoods to watch this year.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80' },
]

const FAQS = [
  { q: 'How do I list my property on the platform?', a: 'Create an account, click "Add Listing", fill in your property details and photos, then submit for review. Most listings go live within 24 hours.' },
  { q: 'Do you charge any fees for browsing listings?', a: 'No. Browsing all listings is completely free. We only charge a small commission when a property is successfully sold or rented.' },
  { q: 'Can I schedule a private tour through the website?', a: 'Yes. Every listing has a "Schedule a Tour" button that lets you book a date and time directly with the listing agent.' },
  { q: 'How do I contact a property agent directly?', a: 'Each agent profile includes phone, email, and a contact form. You can also message them from any of their listings.' },
]

function PropertyCard({ post, index }: { post?: SitePost; index: number }) {
  const fb = PROPERTY_FALLBACK[index % PROPERTY_FALLBACK.length]
  const image = post ? getPostImage(post) : fb.img
  const meta = post ? getPostMeta(post) : { location: fb.location, category: 'Property', price: fb.price, beds: fb.beds, baths: fb.baths, area: fb.area, badge: fb.badge }
  const title = post?.title || fb.title
  const summary = post?.summary || fb.summary
  const slug = post?.slug || fb.slug
  return (
    <Link href={`/listings/${slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <div className="relative h-56 overflow-hidden">
        <ContentImage src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-900 shadow-sm">{meta.badge}</span>
        <span className="absolute right-4 top-4 rounded-full bg-[#4E56C0] px-3 py-1 text-[12px] font-semibold text-white shadow-sm">{meta.price}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {meta.location}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-[#4E56C0]">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{summary}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#4E56C0]" />{meta.beds} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[#4E56C0]" />{meta.baths} Baths</span>
          <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-[#4E56C0]" />{meta.area}</span>
        </div>
      </div>
    </Link>
  )
}

export async function HomePageOverride() {
  const listingPosts = await fetchTaskPosts('listing', 8, { allowMockFallback: false, fresh: true }).catch(() => [] as SitePost[])

  const featured = listingPosts.slice(0, 3)
  const exclusive = listingPosts.slice(3, 9)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_BG} alt="Hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4E56C0]/85 via-[#9B5DE0]/65 to-[#D78FEE]/55" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trusted Property Platform
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {SITE_CONFIG.name}<br />
                <span className="text-white/90">Property Listings</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                Discover exclusive homes, villas, and apartments curated by our local experts. Find your next address with confidence.
              </p>

              <div className="mt-10 grid gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:grid-cols-[1.4fr_1fr_auto] sm:gap-0">
                <div className="flex items-center gap-2 rounded-xl px-4 py-3 sm:rounded-l-xl sm:rounded-r-none sm:border-r sm:border-slate-200">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Search by address, city, or ZIP" />
                </div>
                <div className="flex items-center gap-2 rounded-xl px-4 py-3 sm:rounded-none">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <input className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Any location" />
                </div>
                <Link href="/listings" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3f4aa8]">
                  Search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-white">
                <div><div className="text-3xl font-bold">1,200+</div><div className="text-xs uppercase tracking-wider text-white/70">Active Listings</div></div>
                <div><div className="text-3xl font-bold">450+</div><div className="text-xs uppercase tracking-wider text-white/70">Happy Owners</div></div>
                <div><div className="text-3xl font-bold">15+</div><div className="text-xs uppercase tracking-wider text-white/70">Years Experience</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Handpicked for you</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Our Featured Properties</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Step inside the homes our agents are most excited about this season. Each property is verified, photographed, and ready for tours.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <PropertyCard key={i} post={featured[i]} index={i} />
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
              <div className="text-center md:text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Browse listings</span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Our Most Exclusive Properties</h2>
              </div>
              <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#102f5a]">
                View All Listings
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['All', 'Houses', 'Apartments', 'Villas', 'Lofts', 'Cottages', 'Commercial'].map((cat, i) => (
                <button key={cat} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${i === 0 ? 'border-[#4E56C0] bg-[#4E56C0] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <PropertyCard key={i} post={exclusive[i]} index={i + 3} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-xl">
                <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80" alt="Our journey" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-3xl bg-white p-6 shadow-2xl sm:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4E56C0]/10">
                    <Award className="h-7 w-7 text-[#4E56C0]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Years of trust</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">About us</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Our Journey Toward Excellence</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                For over a decade, {SITE_CONFIG.name} has helped thousands of families find homes they love. We blend local expertise with thoughtful technology to make every listing transparent, accurate, and easy to act on.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, label: 'Verified Listings', text: 'Every property is checked by our team.' },
                  { icon: Users, label: 'Expert Agents', text: 'Local advisors that truly know the market.' },
                  { icon: HomeIcon, label: 'Wide Inventory', text: 'From cozy starters to luxury estates.' },
                  { icon: Award, label: 'Award Winning', text: 'Recognized for service excellence year after year.' },
                ].map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{f.label}</div>
                      <div className="text-sm text-slate-600">{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#4E56C0] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FDCFFA]">What clients say</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Trusted by Homeowners and Agents</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-3xl bg-white/5 p-7 backdrop-blur">
                  <Quote className="h-7 w-7 text-[#FDCFFA]" />
                  <p className="mt-4 text-base leading-7 text-white/90">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-1 text-[#FDCFFA]">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-white/60">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">From the blog</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Read Our Latest Articles</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Tips, market insights, and stories from our agents to help you make smarter property decisions.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <article key={a.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={a.img} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#4E56C0]">{a.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{a.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4E56C0]">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Our team</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Meet Our Agents</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">A team of experienced advisors ready to help you buy, sell, or invest with confidence.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AGENTS.map((a) => (
                <div key={a.name} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl">
                  <div className="relative h-72 overflow-hidden">
                    <img src={a.img} alt={a.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 text-center">
                    <div className="font-semibold text-slate-900">{a.name}</div>
                    <div className="text-sm text-slate-600">{a.role}</div>
                    <div className="mt-3 flex justify-center gap-2 text-slate-500">
                      <Phone className="h-4 w-4" />
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Need help?</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Your Questions Answered</h2>
          </div>
          <div className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-md" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {f.q}
                  <ChevronRight className="h-5 w-5 text-[#4E56C0] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] p-10 text-white shadow-2xl sm:p-14">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's Get Started and Achieve Greatness</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
                  Whether you're listing your home or searching for the perfect place, our agents are one click away. Let's make your next move the right one.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                    Contact an Agent
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
