import { Request, Response } from 'express';
import prisma from '../db';

export async function todoAdd(req: Request, res: Response) {
    try {
        const body = req.body;
        
        const todo = await prisma.todo.create({
            data:{

                task : body.todo,
                

            }

        })

        if(!todo){

            res.json({
                message:"TODO NOT ADDED :((("
            })

        }
        res.json({
            message:"todo added :DD"
        })
        
        
        
        return
    } catch (error) {
        res.json({
            success: "MEOW",
            message: error
        });
        return
    }

}

export async function todoDelete(req: Request, res: Response) {
    try {
        const body = req.body;
        const todo = await prisma.todo.delete({
            where:{
                id: body.id
            }
        })

        if(!todo){
            res.json({
                message: "wow error"
            })
        }
        
        res.json({
            message: "wow deleted!!"
        })
        
        return
    } catch (error) {
        res.json({
            success: "MEOW FALSE",
            message: error
        });
        return
    }

}

export async function todoMarkDone(req: Request, res: Response) {
    try {
        const body = req.body;
        const task = await prisma.todo.findFirst({
            where: { id: body.id },
        });
        const todo = await prisma.todo.update({
            where:{
                id: body.id
            },
            data:{

                status: !task.status
            }
        })
        if(!todo){

            res.json({

                message:"wow not updated :(("
            })

        }
        res.json({
            message: "wow updated!!"
        })
        
        return
    } catch (error) {
        res.json({
            success: "MEOW FALSE",
            message: error
        });
        return
    }

}