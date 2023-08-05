import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation.js";
import urlShorten from "../schemas/urlShorten.schema.js";
import { getUrlId, getUrlOpen, postUrlShorten } from "../controllers/url.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", schemaValidation(urlShorten), postUrlShorten);
urlRouter.get("/urls/:id", getUrlId);
urlRouter.get("/urls/open/:shortUrl", getUrlOpen);

export default urlRouter;