import { Router } from "express";
import { getRanking, getUserById } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/users/me", getUserById);
userRouter.get("/ranking", getRanking);

export default userRouter;