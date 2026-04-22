'use client'

import { Suspense, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Home as HomeIcon, Loader2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get('redirect') || '/'
  const { login, isLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      await login(email.trim(), password)
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            'auth-last-login',
            JSON.stringify({ email: email.trim(), at: new Date().toISOString(), remember })
          )
        } catch {}
      }
      router.push(redirect)
    } catch (err) {
      setError('Sign in failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const busy = submitting || isLoading

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          <div className="relative hidden overflow-hidden rounded-[2rem] lg:block">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Modern home"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4E56C0]/85 via-[#9B5DE0]/55 to-[#D78FEE]/40" />
            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure access
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
                  Welcome back to<br />{SITE_CONFIG.name}
                </h2>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/85">
                  Manage your listings, save your favorite properties, and stay connected with our agents.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  'Save and revisit favorite listings',
                  'Track tour requests and messages',
                  'Get notified about new properties',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                    <ShieldCheck className="h-4 w-4 text-[#FDCFFA]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E56C0] text-white">
                <HomeIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Sign in</p>
                <h1 className="text-2xl font-bold tracking-tight">Access your account</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">Email address</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-[#4E56C0] focus-within:bg-white">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-[#4E56C0] focus-within:bg-white">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Enter your password"
                    required
                    minLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-slate-400 hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#4E56C0] focus:ring-[#4E56C0]"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-semibold text-[#4E56C0] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#4E56C0] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3f4aa8] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-[#4E56C0] hover:underline">
                Create one
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
