import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const SITE_MAP = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const SUPPORT = [
  { name: 'Help Center', href: '/help' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookies', href: '/cookies' },
]

export function FooterOverride() {
  return (
    <footer className="bg-[#2a1e5c] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-white/10 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{SITE_CONFIG.name}</div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Discover homes you'll love. {SITE_CONFIG.name} connects buyers, sellers, and agents through verified listings and trusted local expertise.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Site Map</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SITE_MAP.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Support</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SUPPORT.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
          <div className="text-xs uppercase tracking-[0.2em]">Crafted with care for property seekers</div>
        </div>

        <div className="mt-8 select-none text-center text-[18vw] font-black leading-none tracking-tighter text-white/5 sm:text-[14vw]">
          {SITE_CONFIG.name}
        </div>
      </div>
    </footer>
  )
}
