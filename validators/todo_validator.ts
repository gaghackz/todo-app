import z from 'zod';

export const todoTaskValidator = z.object({
    task: z.string()
});