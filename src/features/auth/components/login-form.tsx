'use client'

import React, { useState } from 'react'
import { Command, Chrome, Github, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginSchema } from '@/lib/validations/auth'
import { authClient } from '@/lib/better-auth/auth-client'

export function LoginForm() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Manual Validation using Zod
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const formattedErrors: Record<string, string> = {}
      result.error.issues.forEach(issue => {
        formattedErrors[issue.path[0] as string] = issue.message
      })
      setErrors(formattedErrors)
      return
    }

    setIsSubmitting(true)
    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: '/',
    }, {
      onSuccess: () => {
        router.push('/')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
        setIsSubmitting(false)
      }
    })
  }

  return (
    <>
      {/* Branding Section */}
      <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
            <Command className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white uppercase tracking-widest text-center">
          NEXUS <span className="text-purple-400 text-base">v2.0</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
          Orchestrate Your Digital World
        </p>
        <div className="h-1 w-12 bg-purple-500 rounded-full mt-2 transition-all duration-500" />
      </div>

      {/* Auth Card */}
      <div className="bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden transition-all duration-500">
        <div className="relative bg-[#0a0a0f] rounded-[2.4rem] p-8 md:p-10">
          
          <div className="space-y-6">
            {/* SOCIAL AUTH (TOP) */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider text-slate-200 cursor-pointer">
                <Chrome className="w-4 h-4" /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider text-slate-200 cursor-pointer">
                <Github className="w-4 h-4" /> GitHub
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="mx-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.4em]">Log in with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <div className="relative group/field">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/field:text-purple-400 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black text-slate-200 border rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all focus:border-purple-500/50 text-sm ${errors.email ? 'border-red-500/50' : 'border-white/5'}`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-400 ml-1 pl-4 animate-in fade-in slide-in-from-left-1">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative group/field">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/field:text-purple-400 transition-colors" />
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Secret Key"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-black text-slate-200 border rounded-xl py-3.5 pl-11 pr-11 outline-none transition-all focus:border-purple-500/50 text-sm ${errors.password ? 'border-red-500/50' : 'border-white/5'}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors cursor-pointer">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-400 ml-1 pl-4 animate-in fade-in slide-in-from-left-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden bg-white text-black font-black py-4 rounded-xl active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl shadow-purple-500/5 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors uppercase tracking-widest text-xs">
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin group-hover:border-t-white" />
                  ) : (
                    <>
                      Authorize Entry
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Toggle */}
      <div className="mt-8 text-center animate-in fade-in duration-1000">
        <p className="text-sm text-slate-500">
          New to the collective?{' '}
          <Link 
            href="/signup"
            className="text-purple-400 font-bold hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
          >
            Join the Grid
          </Link>
        </p>
      </div>
    </>
  )
}
