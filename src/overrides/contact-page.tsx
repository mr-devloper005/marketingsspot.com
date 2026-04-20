'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageSquare, Phone, Send, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const REASONS = [
  { id: 'buy', label: 'I want to buy a property' },
  { id: 'sell', label: 'I want to list / sell' },
  { id: 'rent', label: 'I want to rent or lease' },
  { id: 'agent', label: 'Talk to an agent' },
  { id: 'other', label: 'Something else' },
]

const OFFICES = [
  { city: 'Beverly Hills', address: '123 Property Avenue, Beverly Hills, CA 90210', phone: '+1 (555) 123-4567', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { city: 'Santa Monica', address: '88 Ocean View Blvd, Santa Monica, CA 90401', phone: '+1 (555) 234-5678', img: 'https://images.unsplash.com/photo-1554435493-93422e8d1a41?auto=format&fit=crop&w=600&q=80' },
  { city: 'Pasadena', address: '45 Garden Street, Pasadena, CA 91101', phone: '+1 (555) 345-6789', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80' },
]

export function ContactPageOverride() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('buy')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      if (typeof window !== 'undefined') {
        try {
          const existing = JSON.parse(window.localStorage.getItem('contact-messages') || '[]')
          existing.push({ name, email, phone, reason, message, at: new Date().toISOString() })
          window.localStorage.setItem('contact-messages', JSON.stringify(existing))
        } catch {}
      }
      await new Promise((r) => setTimeout(r, 700))
      setSubmitted(true)
      setName(''); setEmail(''); setPhone(''); setMessage(''); setReason('buy')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] text-white">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <MessageSquare className="h-3.5 w-3.5" /> Contact us
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Let's talk about your next move.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                Whether you're buying, selling, or just exploring, our team is ready to help. Send us a message and we'll be in touch within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Phone, label: 'Call us', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
              { icon: Mail, label: 'Email us', value: `hello@${SITE_CONFIG.domain}`, href: `mailto:hello@${SITE_CONFIG.domain}` },
              { icon: Clock, label: 'Office hours', value: 'Mon - Sat, 9am - 7pm' },
            ].map((c) => (
              <a key={c.label} href={c.href || '#'} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0] transition-colors group-hover:bg-[#4E56C0] group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">{c.label}</div>
                  <div className="text-sm font-semibold text-slate-900">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Why reach out</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A real human, every single time.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                No bots, no endless ticket queues. Your message goes straight to a property advisor who'll get you the answer you need.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Quick response', text: 'Most inquiries get a personal reply within 24 hours.' },
                  { title: 'Honest advice', text: 'Whether the answer helps us close a deal or not, we tell you the truth.' },
                  { title: 'Local knowledge', text: 'Connect with an advisor who actually knows your neighborhood.' },
                ].map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4E56C0]/10 text-[#4E56C0]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{b.title}</div>
                      <div className="text-sm text-slate-600">{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4E56C0]/10 text-[#4E56C0]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">Message received!</h3>
                  <p className="mt-3 max-w-sm text-sm text-slate-600">
                    Thanks for reaching out. One of our advisors will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4E56C0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f4aa8]">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0] text-white">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Get in touch</p>
                      <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-slate-700">Full name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-[#4E56C0] focus:bg-white focus:outline-none" placeholder="Jane Doe" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-[#4E56C0] focus:bg-white focus:outline-none" placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">Phone (optional)</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-[#4E56C0] focus:bg-white focus:outline-none" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">I'm reaching out about</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {REASONS.map((r) => (
                          <button type="button" key={r.id} onClick={() => setReason(r.id)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${reason === r.id ? 'border-[#4E56C0] bg-[#4E56C0] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]'}`}>
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">Your message</label>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 min-h-[150px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-[#4E56C0] focus:bg-white focus:outline-none" placeholder="Tell us a bit about what you're looking for..." required />
                    </div>

                    {error ? (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                    ) : null}

                    <button type="submit" disabled={submitting} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#4E56C0] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3f4aa8] disabled:opacity-70">
                      {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>) : (<>Send Message <ArrowRight className="h-4 w-4" /></>)}
                    </button>
                    <p className="text-xs text-slate-500">By sending, you agree to our <Link href="/privacy" className="text-[#4E56C0] hover:underline">privacy policy</Link>.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4E56C0]">Visit us</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Our offices</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Stop by any of our locations. Coffee's on us.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {OFFICES.map((o) => (
                <div key={o.city} className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-44 overflow-hidden">
                    <img src={o.img} alt={o.city} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#4E56C0]">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Office</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{o.city}</h3>
                    <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4E56C0]" /> {o.address}
                    </div>
                    <a href={`tel:${o.phone}`} className="mt-2 flex items-center gap-2 text-sm text-slate-600 hover:text-[#4E56C0]">
                      <Phone className="h-4 w-4 text-[#4E56C0]" /> {o.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
