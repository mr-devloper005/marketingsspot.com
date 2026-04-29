import Link from 'next/link'
import { ArrowRight, BarChart3, Cookie, KeyRound, Mail, Megaphone, Settings, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Cookies Policy | ${SITE_CONFIG.name}`,
  description: `How ${SITE_CONFIG.name} uses cookies and similar technologies, and how you can manage your preferences.`,
}

const TYPES = [
  { icon: KeyRound, key: 'essential', title: 'Essential', required: true, text: 'Keep you signed in, remember security settings, and let core features work. These cannot be disabled.' },
  { icon: Settings, key: 'preferences', title: 'Preferences', required: false, text: 'Remember things like saved searches, theme, and language so the site feels personal across visits.' },
  { icon: BarChart3, key: 'analytics', title: 'Analytics', required: false, text: 'Help us understand which pages and features are useful so we can improve the platform.' },
  { icon: Megaphone, key: 'marketing', title: 'Marketing', required: false, text: 'Allow us to show relevant property suggestions and measure the success of our campaigns.' },
]

const TABLE = [
  { name: '_session', purpose: 'Keeps you signed in', duration: 'Session', type: 'Essential' },
  { name: '_csrf', purpose: 'Prevents cross-site forgery attacks', duration: 'Session', type: 'Essential' },
  { name: 'theme', purpose: 'Remembers your light / dark choice', duration: '1 year', type: 'Preferences' },
  { name: 'last-search', purpose: 'Restores your last search', duration: '30 days', type: 'Preferences' },
  { name: '_ga', purpose: 'Anonymous usage analytics', duration: '2 years', type: 'Analytics' },
  { name: '_promo_id', purpose: 'Tracks campaign attribution', duration: '90 days', type: 'Marketing' },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <Cookie className="h-3.5 w-3.5" /> Cookies Policy
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">A quick word about cookies.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                We use cookies to keep you signed in, remember your preferences, and understand how the site is used. Here's a clear breakdown of each type and how to control them.
              </p>
              <p className="mt-4 text-sm text-white/70">Last updated: April 1, 2026</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                <Cookie className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">What are cookies?</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Cookies are small text files placed on your device by a website. They help sites recognize your browser, remember your settings, and provide a better experience. We use cookies and similar technologies (like local storage) for the purposes described below.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Categories</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">The cookies we use</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TYPES.map((t) => (
              <div key={t.key} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${t.required ? 'bg-slate-900 text-white' : 'bg-[#4E56C0]/10 text-[#4E56C0]'}`}>
                    {t.required ? 'Always on' : 'Optional'}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{t.title} cookies</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
              <h2 className="text-xl font-bold">Cookies in detail</h2>
              <p className="mt-1 text-sm text-slate-600">A reference of the specific cookies you might encounter on our site.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    {['Name', 'Purpose', 'Duration', 'Type'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TABLE.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-slate-600">{row.purpose}</td>
                      <td className="px-6 py-4 text-slate-600">{row.duration}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#4E56C0]/10 px-2.5 py-1 text-xs font-semibold text-[#4E56C0]">{row.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Manage your preferences</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                You can control optional cookies through the cookie banner that appears on your first visit, or any time from your account settings. You can also clear or block cookies through your browser preferences.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/settings" className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                  Open Settings <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/privacy" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Your trust matters</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                We never use cookies to identify you across unrelated websites or sell your data. Have a question? Reach our team at{' '}
                <a href={`mailto:privacy@${SITE_CONFIG.domain}`} className="text-[#4E56C0] hover:underline">privacy@{SITE_CONFIG.domain}</a>.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]">
                <Mail className="h-4 w-4" /> Contact our privacy team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
