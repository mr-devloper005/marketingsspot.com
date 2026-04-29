'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null }
)

export const NAVBAR_OVERRIDE_ENABLED = true

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 text-slate-900 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt={`${SITE_CONFIG.name} logo`}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-xl font-bold tracking-tight">{SITE_CONFIG.name}</span>
            <span className="block text-[10px] uppercase tracking-[0.24em] text-slate-500">Property Listings</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-[#4E56C0] text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-[#4E56C0]'
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-slate-700 hover:text-[#4E56C0]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[#4E56C0] text-white hover:bg-[#3f4aa8]">
                <Link href="/register">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Listing
                </Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-sm font-semibold',
                    isActive ? 'bg-[#4E56C0] text-white' : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Button variant="outline" asChild className="rounded-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="rounded-full bg-[#4E56C0] text-white hover:bg-[#3f4aa8]">
                  <Link href="/register" onClick={() => setIsOpen(false)}>Add Listing</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
