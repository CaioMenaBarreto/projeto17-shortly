import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import signUpSchema from "../schemas/signUp.schemas.js";
import signInSchema from "../schemas/signIn.schema.js";
import schemaValidation from "../middlewares/schemaValidation.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);

export default authRouter;