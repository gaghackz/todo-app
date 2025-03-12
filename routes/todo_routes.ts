import { Router } from "express";
import { todoAdd,todoDelete,todoMarkDone,todoUpdateTask } from "../controllers/todo";
import { userMiddleware } from '../middlewares/user_middleware';

export const todoRouter = Router();


todoRouter.post("/todo/post",userMiddleware, todoAdd)
todoRouter.post("/todo/put",userMiddleware, todoUpdateTask)
todoRouter.post("/todo/delete",userMiddleware, todoDelete)
todoRouter.post("/todo/markdone",userMiddleware, todoMarkDone)

