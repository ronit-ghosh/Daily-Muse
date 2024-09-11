import { z } from "zod";

export const signinValidation = z.object({
    email: z.string().email({ message: "The email format is wrong!" }),
    password: z.string().min(8, { message: "Password length must be more than 8!" }),
});

export const signupValidation = z.object({
    username: z.string().min(3, { message: "Username length must be more than 3!" }),
    firstname: z.string().min(3, { message: "Firstname length must be more than 3!" }),
    lastname: z.string().min(3, { message: "Lastname length must be more than 3!" }),
    bio: z.string().min(10, { message: "Bio length must be more than 10!" }),
    email: z.string().email({ message: "The email format is wrong!" }),
    password: z.string().min(8, { message: "Password length must be more than 8!" }),
});

export const createBlogValidation = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlogValidation = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
});

export type SigninValidation = z.infer<typeof signinValidation>
export type SignupValidation = z.infer<typeof signupValidation>
export type CreateBlogValidation = z.infer<typeof createBlogValidation>
export type UpdateBlogValidation = z.infer<typeof updateBlogValidation>
