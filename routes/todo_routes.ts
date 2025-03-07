import { Router } from "express";
import { todoAdd,todoDelete,todoMarkDone } from "../controllers/todo";

export const todoRouter = Router();


todoRouter.post("/todo/add", todoAdd)
todoRouter.post("/todo/delete", todoDelete)
todoRouter.post("/todo/markdone",todoMarkDone)
