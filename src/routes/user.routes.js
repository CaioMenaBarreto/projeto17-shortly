import { Router } from "express";
import { getUserById } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/users/me", getUserById);

export default userRouter;