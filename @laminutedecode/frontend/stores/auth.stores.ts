import { authServices } from "@/services/auth.services";
import { AuthState } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(persist((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  login: async (data) => {
    set({ isLoading: true, error: null })

    try {
      const result = await authServices.login(data)
      localStorage.setItem('token', result.access_token)
      set({ user: result.user, token: result.access_token, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Something went wrong', isLoading: false })
      throw error
    }
  },
  register: async (data) => {
    set({ isLoading: true, error: null })

    try {
      const result = await authServices.register(data)
      localStorage.setItem('token', result.access_token)
      set({ user: result.user, token: result.access_token, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Something went wrong', isLoading: false })
      throw error
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, error: null })
  },
  clearError: () => {
    set({ error: null })
  },
  updateUser: async (data) => {
    set({ isLoading: true, error: null })

    const { user } = get()
    if (!user) return

    try {
      const result = await authServices.update(user.id, data)
      set({ user: result, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Something went wrong', isLoading: false })
      throw error
    }
  },
  setUser: (user) => {
    set({ user })
  }
}), {
  name: 'auth-storage',
  partialize: (state) => ({ user: state.user, token: state.token })
}))
