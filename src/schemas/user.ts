import z from "zod"

export const user = z.object({
    username: z.string(),
    email: z.string().email()
})

export type User = z.infer<typeof user>