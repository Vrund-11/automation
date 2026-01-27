'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Github } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { loginSchema } from '@/lib/validations/auth'
import { authClient } from '@/lib/better-auth/auth-client'

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: '/',
    }, {
      onSuccess: () => {
        router.push('/')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-[360px] rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-lg">

        <h1 className="text-xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-white/60 mb-5">
          Continue to your account
        </p>

        {/* 🔐 Social Auth */}
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-zinc-800 py-2 text-sm hover:bg-zinc-700 transition"
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-zinc-800 py-2 text-sm hover:bg-zinc-700 transition"
          >
            <Github size={16} />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/50">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* 📧 Email / Password */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-xs text-white/60">Email</label>
            <input
              {...form.register('email')}
              type="email"
              className="mt-1 w-full rounded-md bg-zinc-800 border border-white/10 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">Password</label>
            <input
              {...form.register('password')}
              type="password"
              className="mt-1 w-full rounded-md bg-zinc-800 border border-white/10 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium hover:bg-indigo-500 transition disabled:opacity-60"
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
