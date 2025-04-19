import { Request, Response } from 'express';
import { todoTaskValidator } from '../validators/todo_validator';
import prisma from '../db';


export async function todoAdd(req :Request, res: Response) {
    try {
        const body = req.body;
        const check = todoTaskValidator.safeParse(body);
                if (!check.success) {
                    res.status(400).json({
                        success: false,
                        message: check.error
                    });
                    return
                }
        const todo = await prisma.todo.create({
            data:{
                task: body.todo,
                userid: req.id
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
            success: "false",
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

export async function todoUpdateTask(req: Request, res: Response){

    console.log(req.id)
    const body = req.body;
    const todo = await prisma.todo.update({
            where:{
                id: body.id,
                userid: req.id
                
            },
            data:{

                task: body.todo

            }
    
    })

    if(!todo){

        res.json({

            message: "that didn't work :(("
        })
        return
    }

    res.json({
        message:"Updated."
    })

}