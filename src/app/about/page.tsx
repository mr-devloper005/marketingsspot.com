import Link from 'next/link'
import { ArrowRight, Award, Building2, Compass, Globe2, Heart, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `About Us | ${SITE_CONFIG.name}`,
  description: `Learn about ${SITE_CONFIG.name}, our mission, our team, and how we help families find homes they love.`,
}

const STATS = [
  { value: '15+', label: 'Years of trust' },
  { value: '1,200+', label: 'Active listings' },
  { value: '450+', label: 'Happy owners' },
  { value: '40+', label: 'Expert agents' },
]

const VALUES = [
  { icon: ShieldCheck, title: 'Honesty First', text: 'Every listing is verified and every price is what we say it is. No surprises, no hidden fees.' },
  { icon: Heart, title: 'People Over Properties', text: 'Behind every listing is a family. We listen first and recommend second.' },
  { icon: Compass, title: 'Local Expertise', text: 'Our agents live in the neighborhoods they serve, so the advice you get is grounded in reality.' },
  { icon: Sparkles, title: 'Modern Workflow', text: 'Smart tools, thoughtful design, and clear communication at every step of the journey.' },
]

const MILESTONES = [
  { year: '2010', title: 'Founded', text: 'A two-person team opens doors with one office and a notebook full of ideas.' },
  { year: '2014', title: 'First 500 sales', text: 'We celebrate our 500th closed deal and grow into a team of fifteen agents.' },
  { year: '2019', title: 'Online platform', text: 'We launch our digital listings hub to make searching homes effortless.' },
  { year: '2023', title: 'National coverage', text: 'Our network expands to cover every major metro across the country.' },
  { year: '2026', title: 'Today', text: 'A trusted partner for over 12,000 families and counting.' },
]

const LEADERSHIP = [
  { name: 'Daniel Carter', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sophia Reyes', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marcus Chen', role: 'Head of Investments', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  <Building2 className="h-3.5 w-3.5" /> About {SITE_CONFIG.name}
                </span>
                <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                  Helping people find a place to call home.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                  We're more than a listing platform. We're a team of agents, technologists, and local experts who believe finding the right home should feel personal, transparent, and exciting.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                    Browse Listings <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                    Talk to an Agent
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80" alt="Our team" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 text-slate-900 shadow-2xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4E56C0]/10">
                      <Award className="h-6 w-6 text-[#4E56C0]" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">Top 10</div>
                      <div className="text-xs text-slate-500">Real estate platform 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="text-4xl font-bold text-[#4E56C0]">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-[2rem] shadow-xl">
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80" alt="Our mission" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Our Mission</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A simpler, more honest way to buy and sell homes.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                We started {SITE_CONFIG.name} because finding a home shouldn't feel like guesswork. Every listing on our platform is verified, every photo is real, and every agent is held to a high standard of service.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Whether you're browsing for the first time or closing on your fifth investment, we want the experience to feel calm, confident, and clear.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Verified property listings', 'No-pressure agent matching', 'Transparent pricing', '24/7 client support'].map((b) => (
                  <div key={b} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-[#4E56C0]" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Our Values</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">What we stand for</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Four simple principles guide every listing we publish and every conversation we have.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => (
                <div key={v.title} className="group rounded-3xl bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0] transition-colors group-hover:bg-[#4E56C0] group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Our Journey</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A look back at our milestones</h2>
          </div>
          <div className="mt-14 relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-slate-200 lg:block" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="grid gap-6 lg:grid-cols-2 lg:items-center">
                  <div className={i % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:order-2 lg:pl-12'}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0]/10 px-3 py-1 text-xs font-bold tracking-wider text-[#4E56C0]">
                      {m.year}
                    </div>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900">{m.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{m.text}</p>
                  </div>
                  <div className={i % 2 === 0 ? 'hidden lg:block' : 'hidden lg:order-1 lg:block'} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Leadership</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">The people behind the platform</h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {LEADERSHIP.map((p) => (
                <div key={p.name} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative h-72 overflow-hidden">
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-sm text-[#4E56C0]">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                Talk to Our Team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] p-10 text-white shadow-2xl sm:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your next home?</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
                  Browse thousands of verified listings or talk to an expert advisor today.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                    Browse Listings <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="hidden gap-3 lg:grid">
                {[
                  { icon: Users, label: '40+ expert agents' },
                  { icon: Globe2, label: 'Nationwide coverage' },
                  { icon: MapPin, label: 'Local market knowledge' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    <f.icon className="h-5 w-5 text-[#FDCFFA]" /> {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
