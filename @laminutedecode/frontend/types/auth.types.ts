import { LoginFormData, RegisterFormData, UpdatedUserFormData } from "@/schemas/auth.schemas"

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (data: LoginFormData) => Promise<void>
  register: (data: RegisterFormData) => Promise<void>
  logout: () => void
  clearError: () => void
  updateUser: (date: UpdatedUserFormData) => Promise<void>
  setUser: (user: User) => void
}

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  name: string
  email: string
  role: ROLE
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  access_token: string
}
