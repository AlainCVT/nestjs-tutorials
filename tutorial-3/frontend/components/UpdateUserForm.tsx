"use client"

import { UpdatedUserFormData, updatedUserSchema } from "@/schemas/auth.schemas"
import { useAuthStore } from "@/stores/auth.stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Loader2, Mail, Pencil, User } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

type FormData = UpdatedUserFormData

export default function UpdateUserForm() {
  const { user, updateUser, isLoading } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(updatedUserSchema),
    defaultValues: { name: '', email: '' }
  })

  useEffect(() => {
    if (user) {
      form.reset({ ...user })
    }
  }, [user, form])

  const onSubmit = async (data: FormData) => {
    if (!user) return
    setError(null)
    setSuccess(null)

    const updatedData: UpdatedUserFormData = {}

    if (data.name && data.name !== user.name) updatedData.name = data.name
    if (data.email && data.email !== user.email) updatedData.email = data.email

    if (!Object.keys(updatedData).length) {
      setError('No data updated')
      return
    }

    try {
      await updateUser(data)
      setSuccess('Profile updated')
    } catch (_error) {
      setError(_error instanceof Error ? _error.message : 'Something went wrong')
    }
  }

  if (!user) {
    return (
      <div className="text-slate-400 text-center p-4">
        Loading user data…
      </div>
    )
  }

  return (
    <Card className="bg-slate-800/50 border border-slate-700/50">
      <CardHeader className="flex items-center gap-2">
        <Pencil className="size-4 text-emerald-400" />
        <CardTitle className="text-white">Edit profile</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">{success}</div>
        )}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

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

          <Button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border">
            {isLoading ? (<><Loader2 className="size-4 animate-spin" />Editing profile</>) : 'Edit profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
