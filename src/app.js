import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database/database.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));