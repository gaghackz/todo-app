import { Request, Response } from 'express';
import { userLoginValidator, userRegisterValidator } from '../validators/user_validator';
import prisma from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function UserLogin(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userLoginValidator.safeParse(body);
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        const user = await prisma.user.findFirst({
            where: {
                username: check.data.username,
            }
        });
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
            return
        }
        const checkPassword = await bcrypt.compare(check.data.password, user.password);

        if (!checkPassword) {
            res.json({
                success: false,
                message: "Password is incorrect"
            });
            return
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.json({
            success: true,
            message: "User logged in successfully",
            data: token
        });
        return
    } catch (error) {
        res.json({
            success: false,
            message: error
        });
        return
    }

}






export async function UserRegister(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userRegisterValidator.safeParse(body);
        
        if (!check.success) {
            res.json({
                success: false,
                message: check.error
                
            });
            return
        }
        
        const checkUser = await prisma.user.findFirst({
            where: {
                username: check.data.username
            }
        });

        if (checkUser) {
            res.json({
                success: false,
                message: "User already exists"
            });
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(check.data.password, salt);
        const user = await prisma.user.create({
            data: {
                username: check.data.username,
                password: hashedPassword,
                
            }
        })
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        
        res.json({
            success: true,
            message: "User registered successfully",
            data: token
        });
        return
    } catch (error) {
        res.json({
            success: "MEOW",
            message: error
        });
        return
    }

}

export async function UserFetch(req: Request, res: Response){

    const body = req.body;

    const todos = await prisma.todo.findMany({
        
        where: {
            userid: req.id
        }
    })

    res.json({

        tasks: todos
    })

}