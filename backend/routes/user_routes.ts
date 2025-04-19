import { Router } from "express";
import { UserRegister,UserLogin, UserFetch } from "../controllers/user";
import { userMiddleware } from '../middlewares/user_middleware';
export const userRouter = Router();


userRouter.post("/user/register", UserRegister)
userRouter.post("/user/login", UserLogin)
userRouter.get("/user",userMiddleware, UserFetch)
