import Link from 'next/link'
import { ArrowRight, Database, Eye, FileText, Lock, Mail, Settings, ShieldCheck, UserCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: `How ${SITE_CONFIG.name} collects, uses, and protects your personal information.`,
}

const TOC = [
  { id: 'collect', label: 'Data we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'share', label: 'Sharing & disclosure' },
  { id: 'security', label: 'Security' },
  { id: 'rights', label: 'Your rights' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'changes', label: 'Policy changes' },
  { id: 'contact', label: 'Contact us' },
]

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'We never sell your data', text: 'Your personal information is yours. We do not sell or rent it to third parties.' },
  { icon: Lock, title: 'Encrypted in transit and at rest', text: 'Industry-standard encryption protects your data at every stage.' },
  { icon: UserCheck, title: 'You stay in control', text: 'Update, export, or delete your information any time from your account.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5" /> Privacy Policy
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Your privacy, plainly explained.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                A clear overview of what we collect, why we collect it, and how we keep it safe.
              </p>
              <p className="mt-4 text-sm text-white/70">Last updated: April 1, 2026 · Effective: April 15, 2026</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{h.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">On this page</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-white hover:text-[#4E56C0]">{t.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="prose prose-slate max-w-none space-y-10 text-slate-700">
              <section id="collect">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Database className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">1. Data we collect</h2>
                </div>
                <p className="mt-4">When you use {SITE_CONFIG.name}, we collect three categories of information:</p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li><strong>Account data</strong> — your name, email, phone number, and profile photo when you create an account.</li>
                  <li><strong>Activity data</strong> — listings you save, properties you view, searches you run, and messages you send through the platform.</li>
                  <li><strong>Device data</strong> — basic technical details like browser type, IP address, and the pages you visit, used for performance and security.</li>
                </ul>
              </section>

              <section id="use">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Settings className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">2. How we use data</h2>
                </div>
                <p className="mt-4">We use your information to operate the platform, personalize your experience, and improve our service. Specifically:</p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>To match you with relevant listings and agents.</li>
                  <li>To send tour confirmations, saved-search alerts, and important account notices.</li>
                  <li>To analyze how the platform is used so we can fix bugs and ship improvements.</li>
                  <li>To prevent fraud, abuse, and unauthorized access.</li>
                </ul>
              </section>

              <section id="share">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Eye className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">3. Sharing & disclosure</h2>
                </div>
                <p className="mt-4">We share information only when necessary:</p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li><strong>With agents</strong> you contact through a listing or tour request.</li>
                  <li><strong>With trusted vendors</strong> who help us run the platform (hosting, email delivery, analytics) under strict confidentiality.</li>
                  <li><strong>When required by law</strong> or to protect the rights, safety, or property of users and the public.</li>
                </ul>
              </section>

              <section id="security">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Lock className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">4. Security</h2>
                </div>
                <p className="mt-4">We use TLS encryption in transit, encrypted storage at rest, and routine security reviews. No system is perfect, so we also recommend strong unique passwords and turning on two-factor authentication.</p>
              </section>

              <section id="rights">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><UserCheck className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">5. Your rights</h2>
                </div>
                <p className="mt-4">You can access, edit, export, or delete your personal data at any time from your account settings. Want help? Email <a href={`mailto:privacy@${SITE_CONFIG.domain}`} className="text-[#4E56C0] hover:underline">privacy@{SITE_CONFIG.domain}</a>.</p>
              </section>

              <section id="cookies">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><FileText className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">6. Cookies</h2>
                </div>
                <p className="mt-4">We use cookies to keep you signed in, remember preferences, and measure performance. See our <Link href="/cookies" className="text-[#4E56C0] hover:underline">cookies policy</Link> for the full breakdown.</p>
              </section>

              <section id="changes">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Settings className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">7. Policy changes</h2>
                </div>
                <p className="mt-4">When we make material changes, we'll notify you by email and post a notice on the homepage at least 30 days before the new terms take effect.</p>
              </section>

              <section id="contact">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]"><Mail className="h-5 w-5" /></div>
                  <h2 className="m-0 text-2xl font-bold text-slate-900">8. Contact us</h2>
                </div>
                <p className="mt-4">Questions about this policy? Reach our privacy team at <a href={`mailto:privacy@${SITE_CONFIG.domain}`} className="text-[#4E56C0] hover:underline">privacy@{SITE_CONFIG.domain}</a> or use our <Link href="/contact" className="text-[#4E56C0] hover:underline">contact page</Link>.</p>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <p className="font-semibold text-slate-900">Have a privacy concern?</p>
                  <p className="text-sm text-slate-600">We respond to every inquiry within 48 hours.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
