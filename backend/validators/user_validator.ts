import z from 'zod';
export const userLoginValidator = z.object({
    username: z.string(),
    password: z.string().min(6),
});
export const userRegisterValidator = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});