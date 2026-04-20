import Link from 'next/link'
import { ArrowRight, BookOpen, FileCheck2, Gavel, Mail, Scale, ShieldAlert, UserCog, XCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description: `The rules and agreement that govern the use of ${SITE_CONFIG.name}.`,
}

const TOC = [
  { id: 'acceptance', label: '1. Acceptance' },
  { id: 'eligibility', label: '2. Eligibility' },
  { id: 'account', label: '3. Your account' },
  { id: 'content', label: '4. Listings & content' },
  { id: 'conduct', label: '5. Acceptable use' },
  { id: 'fees', label: '6. Fees & payments' },
  { id: 'termination', label: '7. Termination' },
  { id: 'liability', label: '8. Liability' },
  { id: 'law', label: '9. Governing law' },
  { id: 'contact', label: '10. Contact' },
]

const SECTIONS = [
  { id: 'acceptance', icon: FileCheck2, title: '1. Acceptance of terms', body: `By accessing or using ${SITE_CONFIG.name}, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.` },
  { id: 'eligibility', icon: UserCog, title: '2. Eligibility', body: `You must be at least 18 years old and able to enter into a legally binding contract to use ${SITE_CONFIG.name}. By creating an account, you confirm that you meet these requirements.` },
  { id: 'account', icon: ShieldAlert, title: '3. Your account', body: `You are responsible for maintaining the confidentiality of your login credentials and for any activity that occurs under your account. Notify us immediately if you suspect unauthorized access.` },
  { id: 'content', icon: BookOpen, title: '4. Listings & content', body: `You retain ownership of the content and listings you publish. By posting, you grant ${SITE_CONFIG.name} a non-exclusive license to display and promote your listings on our platform. You must have all necessary rights to the content you submit.` },
  { id: 'conduct', icon: XCircle, title: '5. Acceptable use', body: `You agree not to post false, misleading, or fraudulent listings, harass other users, scrape data, or attempt to disrupt the service. We reserve the right to remove content or suspend accounts that violate these rules.` },
  { id: 'fees', icon: Scale, title: '6. Fees & payments', body: `Browsing the platform is free. Optional services such as featured listings, premium agent subscriptions, and transaction commissions are billed transparently and require explicit acceptance before any charges are made.` },
  { id: 'termination', icon: Gavel, title: '7. Termination', body: `You can close your account at any time from your settings. We may suspend or terminate accounts that violate these terms or engage in conduct harmful to other users. Refunds for prepaid services are issued on a pro-rata basis where applicable.` },
  { id: 'liability', icon: ShieldAlert, title: '8. Limitation of liability', body: `${SITE_CONFIG.name} is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from the use of the platform, to the maximum extent permitted by law.` },
  { id: 'law', icon: Scale, title: '9. Governing law', body: `These terms are governed by the laws of the State of California, without regard to its conflict-of-law principles. Any disputes will be resolved in the courts located in Los Angeles County, California.` },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <Gavel className="h-3.5 w-3.5" /> Terms of Service
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">The rules of the road.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                The agreement between you and {SITE_CONFIG.name}, written in plain language so you actually know what you're agreeing to.
              </p>
              <p className="mt-4 text-sm text-white/70">Last updated: April 1, 2026 · Effective: April 15, 2026</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Sections</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-white hover:text-[#4E56C0]">{t.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="space-y-8">
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{s.title}</h2>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-600">{s.body}</p>
                </section>
              ))}

              <section id="contact" className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0]/10 text-[#4E56C0]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">10. Contact</h2>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Questions about these terms? Email us at{' '}
                  <a href={`mailto:legal@${SITE_CONFIG.domain}`} className="text-[#4E56C0] hover:underline">legal@{SITE_CONFIG.domain}</a>{' '}or use our{' '}
                  <Link href="/contact" className="text-[#4E56C0] hover:underline">contact page</Link>.
                </p>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] p-6 text-white">
                <div>
                  <p className="font-semibold">By using {SITE_CONFIG.name}, you agree to these terms.</p>
                  <p className="text-sm text-white/85">Take a look at our privacy policy too.</p>
                </div>
                <Link href="/privacy" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4E56C0] hover:bg-slate-100">
                  Read Privacy Policy <ArrowRight className="h-4 w-4" />
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
