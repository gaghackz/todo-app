import { Router } from "express";
import { todoAdd,todoDelete,todoMarkDone,todoUpdateTask } from "../controllers/todo";
import { userMiddleware } from '../middlewares/user_middleware';

export const todoRouter = Router();


todoRouter.post("/todo",userMiddleware, todoAdd)
todoRouter.put("/todo",userMiddleware, todoUpdateTask)
todoRouter.delete("/todo",userMiddleware, todoDelete)
todoRouter.post("/todo/markdone",userMiddleware, todoMarkDone)

