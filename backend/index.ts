import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRouter } from "./routes/user_routes";
import { todoRouter } from "./routes/todo_routes";

const app = express();
app.use(express.json());
const corsOption = {
  origin: ["http://localhost:5173", "https://todo-app3245.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

app.use("/api/v1", userRouter);
app.use("/api/v1", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
