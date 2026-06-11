import z from "zod";

const authSchema = z.object({
  name: z.string().min(8, { error: 'Name length should be higher than 8' }).max(40, { error: 'Name length should be lower than 40' }),
  email: z.email({ error: 'Invalid email' }),
  password: z.string().min(8, { error: 'Password length should be higher than 8' }).max(40, { error: 'Password length should be lower than 40' }),
})

export const loginSchema = authSchema.omit({ name: true })
export const registerSchema = authSchema
export const updatedUserSchema = authSchema.omit({ password: true }).partial()

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type UpdatedUserFormData = z.infer<typeof updatedUserSchema>
