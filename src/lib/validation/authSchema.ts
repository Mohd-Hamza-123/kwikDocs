import { z } from 'zod'

export const emailSchema = z
    .string()
    .email("Invalid email address")
    .max(70, "Email is too long. Please enter a shorter email.")
    .toLowerCase()
    .trim()

export const passwordSchema = z
    .string()
    .min(8, "Password is too short. Please enter a longer password.")
    .max(50, "Password is too long. Please enter a shorter password.")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );

export const usernameSchema = z
    .string()
    .min(3, "Username is too short. Please enter a longer username.")
    .max(30, "Username is too long. Please enter a shorter username.")
    .toLowerCase()
    .trim()


export const signupSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema
})

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export type loginSchemaType = z.infer<typeof loginSchema>
export type signupSchemaType = z.infer<typeof signupSchema>