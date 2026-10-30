"use client"

import AuthForm from "@/components/AuthForm";
import { useAuthStore } from "@/stores/auth.stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { token } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [token, router])

  if (token) {
    return
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
