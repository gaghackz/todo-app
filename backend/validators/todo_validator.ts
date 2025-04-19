import z from 'zod';

export const todoTaskValidator = z.object({
    todo: z.string()
});