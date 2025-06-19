import { z } from 'zod'

export const emailSchema = z
    .string()
    .email("Invalid email address")
    .min(7, "Email is too short. Please enter a longer email.")
    .max(70, "Email is too long. Please enter a shorter email.")
    .toLowerCase()
    .trim()


    