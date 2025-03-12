import { Router } from "express";
import { todoAdd,todoDelete,todoMarkDone } from "../controllers/todo";
import { userMiddleware } from '../middlewares/user_middleware';

export const todoRouter = Router();


todoRouter.post("/todo/add",userMiddleware, todoAdd)
todoRouter.post("/todo/delete",userMiddleware, todoDelete)
todoRouter.post("/todo/markdone",userMiddleware, todoMarkDone)
