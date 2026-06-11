"use client"

import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from "@/schemas/auth.schemas"
import { useAuthStore } from "@/stores/auth.stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Loader2, Lock, Mail, User } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

type FormData = LoginFormData | RegisterFormData

export default function AuthForm() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

  const { login, register, isLoading, error, clearError } = useAuthStore()

  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(isLoggingIn ? loginSchema : registerSchema),
    defaultValues: { email: '', password: '', ...isLoggingIn ? {} : { name: '' } }
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (isLoggingIn) {
        await login(data as LoginFormData)
      } else {
        await register(data as RegisterFormData)
      }
      router.push('/dashboard')
    } catch {

    }
  }

  const toggleMode = () => {
    setIsLoggingIn(!isLoggingIn)
    clearError()
    form.reset({ email: '', password: '', ...isLoggingIn ? {} : { name: '' } })
  }

  return (
    <Card className="bg-slate-800/50 border border-slate-700/50">
      <CardHeader className="px-4">
        <CardTitle className="text-white">{isLoggingIn ? 'Sign in' : 'Sign up'}</CardTitle>
        <CardDescription className="text-slate-400">{isLoggingIn ? 'Authenticate your account' : 'Create an account'}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
        )}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {!isLoggingIn && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...form.register('name' as keyof FormData)}
                  className="pl-10 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            {'name' in form.formState.errors && form.formState.errors.name && (
              <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
            )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="email"
                type="text"
                placeholder="Email"
                {...form.register('email' as keyof FormData)}
                className="pl-10 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...form.register('password' as keyof FormData)}
                className="pl-10 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-red-400 text-sm">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border">
            {isLoading ? (<><Loader2 className="size-4 animate-spin" />{isLoggingIn ? 'Signing in…' : 'Signing up…'}</>) : (isLoggingIn ? 'Sign in' : 'Sign up')}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
          <span className="text-slate-400">{isLoggingIn ? 'Not account yet?' : 'Already have an account?'}</span>
          {' '}
          <button type="button" disabled={isLoading} className="text-emerald-500 hover:underline" onClick={toggleMode}>
            {isLoggingIn ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
