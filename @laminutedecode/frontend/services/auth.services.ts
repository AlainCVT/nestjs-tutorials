import { LoginFormData, RegisterFormData, UpdatedUserFormData } from "@/schemas/auth.schemas"
import { AuthResponse, User } from "@/types/auth.types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authServices = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message)
    }

    return result
  },
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message)
    }

    return result
  },
  async update(id: User['id'], data: UpdatedUserFormData): Promise<User> {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message)
    }

    return result
  },
  async getProfile(): Promise<User> {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message)
    }

    return result
  },
}
