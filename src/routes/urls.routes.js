import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation.js";
import urlShorten from "../schemas/urlShorten.schema.js";
import { postUrlShorten } from "../controllers/url.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", schemaValidation(urlShorten), postUrlShorten);

export default urlRouter;