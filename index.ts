import express from "express"
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userRouter } from "./routes/user_routes";
import { todoRouter } from "./routes/todo_routes";





const app = express()
app.use(express.json())

app.use("/api/v1", userRouter)
app.use("/api/v1",todoRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
}
)