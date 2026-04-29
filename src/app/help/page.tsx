import Link from 'next/link'
import { ArrowRight, Book, ChevronRight, FileText, HeadphonesIcon, Home as HomeIcon, KeyRound, LifeBuoy, Mail, MessageSquare, Phone, Search, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Help Center | ${SITE_CONFIG.name}`,
  description: `Guides, FAQs, and support for using ${SITE_CONFIG.name} to buy, sell, or list properties.`,
}

const TOPICS = [
  { icon: HomeIcon, title: 'Buying a Property', count: 14, text: 'Tours, offers, financing, and closing — everything from search to keys.' },
  { icon: KeyRound, title: 'Selling Your Home', count: 12, text: 'Pricing, photos, listing setup, and negotiating offers with confidence.' },
  { icon: Users, title: 'Working with Agents', count: 9, text: 'Finding the right advisor, communication, and what to expect at each stage.' },
  { icon: ShieldCheck, title: 'Account & Security', count: 8, text: 'Login issues, password resets, two-factor, and managing your profile.' },
  { icon: FileText, title: 'Listings & Photos', count: 11, text: 'Edit listings, upload media, manage status, and improve your visibility.' },
  { icon: LifeBuoy, title: 'Payments & Billing', count: 7, text: 'Subscriptions, refunds, invoices, and payment-related questions.' },
]

const FAQS = [
  { q: 'How do I list my property on the platform?', a: 'Create an account, click "Add Listing", fill in your property details and photos, then submit for review. Most listings go live within 24 hours.' },
  { q: 'Do you charge any fees for browsing listings?', a: 'No. Browsing all listings is completely free. We only charge a small commission when a property is successfully sold or rented through one of our partner agents.' },
  { q: 'Can I schedule a private tour through the website?', a: 'Yes. Every listing has a "Schedule a Tour" button that lets you book a date and time directly with the listing agent.' },
  { q: 'How do I contact a property agent directly?', a: 'Each agent profile includes phone, email, and a contact form. You can also message them from any of their listings.' },
  { q: 'How do I reset my password?', a: 'On the sign-in page, click "Forgot password?" and enter your email. We will send a secure reset link within a few minutes.' },
  { q: 'Are the listing prices negotiable?', a: 'In most cases, yes. The listed price is a starting point, and our agents are happy to help you put together a competitive offer.' },
  { q: 'What happens after I submit an offer?', a: 'The seller and their agent typically respond within 48 hours. We will keep you updated and walk you through every counter, acceptance, or rejection.' },
  { q: 'How can I update my saved searches?', a: 'Go to your dashboard, open the "Saved Searches" tab, and you can edit, pause, or delete any search at any time.' },
]

const POPULAR = [
  'How do I create a listing?',
  'What documents do I need to sell a home?',
  'Can I tour a property the same day?',
  'How does the buyer-agent commission work?',
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <LifeBuoy className="h-3.5 w-3.5" /> Help Center
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">How can we help?</h1>
              <p className="mt-6 text-lg leading-8 text-white/85">
                Search our guides or browse popular topics. Can't find what you need? Our support team is one click away.
              </p>
              <div className="mt-10 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl">
                <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Search articles, guides, and FAQs..." />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                  Search <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-white/80">
                <span className="text-xs uppercase tracking-wider text-white/60">Popular:</span>
                {POPULAR.map((p) => (
                  <button key={p} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs hover:bg-white/15">{p}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Browse topics</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Find answers by category</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <Link key={t.title} href="#faq" className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-[#4E56C0]/30 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0] transition-colors group-hover:bg-[#4E56C0] group-hover:text-white">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.count} articles</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{t.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E56C0]">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">FAQ</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Frequently asked questions</h2>
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
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Need more help?</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Talk to a real person</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Pick the channel that works best for you. We're here every day.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Phone, title: 'Call us', text: 'Mon–Sat, 9am–7pm', cta: '+1 (555) 123-4567', href: 'tel:+15551234567' },
              { icon: Mail, title: 'Email support', text: 'Reply within 24 hours', cta: `hello@${SITE_CONFIG.domain}`, href: `mailto:hello@${SITE_CONFIG.domain}` },
              { icon: MessageSquare, title: 'Send a message', text: 'Use our contact form', cta: 'Open form', href: '/contact' },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="group rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0] transition-colors group-hover:bg-[#4E56C0] group-hover:text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.text}</p>
                <p className="mt-4 text-sm font-semibold text-[#4E56C0]">{c.cta}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] p-10 text-white shadow-2xl sm:p-14">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Still stuck? We've got you.</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85">Our support team responds to every message personally — no scripts, no bots.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                  Contact Support <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/listings" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                  Browse Listings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
