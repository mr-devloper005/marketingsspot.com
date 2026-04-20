import Link from 'next/link'
import { ArrowRight, Award, Mail, MapPin, Phone, Search, Star, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Our Agents | ${SITE_CONFIG.name}`,
  description: `Meet the licensed property advisors of ${SITE_CONFIG.name} ready to help you buy, sell, or invest.`,
}

const AGENTS = [
  { name: 'Daniel Carter', role: 'Senior Property Advisor', city: 'Beverly Hills, CA', deals: 142, rating: 4.9, phone: '+1 (555) 010-1101', email: 'daniel@example.com', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', specialty: 'Luxury Homes' },
  { name: 'Sophia Reyes', role: 'Luxury Homes Specialist', city: 'Santa Monica, CA', deals: 118, rating: 4.8, phone: '+1 (555) 010-1102', email: 'sophia@example.com', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', specialty: 'Beachfront' },
  { name: 'Marcus Chen', role: 'Investment Consultant', city: 'Los Angeles, CA', deals: 95, rating: 4.9, phone: '+1 (555) 010-1103', email: 'marcus@example.com', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', specialty: 'Investment' },
  { name: 'Elena Brooks', role: 'Residential Expert', city: 'Pasadena, CA', deals: 167, rating: 5.0, phone: '+1 (555) 010-1104', email: 'elena@example.com', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80', specialty: 'Family Homes' },
  { name: 'Aiden Park', role: 'Commercial Specialist', city: 'Downtown LA', deals: 73, rating: 4.7, phone: '+1 (555) 010-1105', email: 'aiden@example.com', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', specialty: 'Commercial' },
  { name: 'Priya Sharma', role: 'First-Time Buyer Coach', city: 'Long Beach, CA', deals: 88, rating: 4.9, phone: '+1 (555) 010-1106', email: 'priya@example.com', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', specialty: 'Starter Homes' },
  { name: 'Jordan Walsh', role: 'Rental & Lease Advisor', city: 'Hollywood, CA', deals: 124, rating: 4.8, phone: '+1 (555) 010-1107', email: 'jordan@example.com', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80', specialty: 'Rentals' },
  { name: 'Maya Olsen', role: 'New Developments Lead', city: 'Culver City, CA', deals: 109, rating: 4.9, phone: '+1 (555) 010-1108', email: 'maya@example.com', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', specialty: 'New Builds' },
]

const SPECIALTIES = ['All Agents', 'Luxury Homes', 'Investment', 'Family Homes', 'Commercial', 'Rentals', 'New Builds']

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80" alt="Team" className="h-full w-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <Users className="h-3.5 w-3.5" /> Our Agents
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                Meet the people who'll help you find home.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                A handpicked team of licensed advisors with deep local knowledge and a relentless focus on your goals.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-2 rounded-2xl bg-white p-3 shadow-2xl sm:grid-cols-[1.5fr_1fr_auto]">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input className="w-full bg-transparent text-sm focus:outline-none" placeholder="Search by agent name" />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <MapPin className="h-4 w-4 text-slate-400" />
              <input className="w-full bg-transparent text-sm focus:outline-none" placeholder="Filter by city" />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map((s, i) => (
              <button key={s} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${i === 0 ? 'border-[#4E56C0] bg-[#4E56C0] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]'}`}>
                {s}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((a) => (
              <div key={a.name} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-72 overflow-hidden">
                  <img src={a.img} alt={a.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
                    {a.specialty}
                  </span>
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#4E56C0] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    <Star className="h-3 w-3 fill-current" /> {a.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-bold text-slate-900">{a.name}</div>
                  <div className="text-sm text-[#4E56C0]">{a.role}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" /> {a.city}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
                    <span className="font-semibold">{a.deals} deals</span>
                    <div className="flex gap-2">
                      <a href={`tel:${a.phone}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#4E56C0] hover:text-white">
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      <a href={`mailto:${a.email}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#4E56C0] hover:text-white">
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Join the team</span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Are you a licensed agent?</h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  We're always looking for people who care about clients first. Bring your hustle, we'll bring the platform, leads, and support.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Award, label: 'Top commission splits' },
                    { icon: Users, label: 'Mentorship & training' },
                    { icon: Star, label: 'Premium lead pipeline' },
                    { icon: MapPin, label: 'Flexible local territories' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                      <b.icon className="h-4 w-4 text-[#4E56C0]" /> {b.label}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                  Apply to Join <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-[2rem] shadow-xl">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" alt="Team meeting" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
