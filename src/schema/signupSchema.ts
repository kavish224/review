import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast two characters")
    .max(20, "username must be no more than 20 characters")
    .regex(/^[a-zA-z0-9_]+$/, "username nust not contain special character")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "invalid email address"}),
    password : z.string().min(6,{message: "password must be six characters"}),
})
