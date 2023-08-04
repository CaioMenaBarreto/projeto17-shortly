import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import pg from "pg";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: "As senhas precisam ser iguais." });
    };

    try {
        const hash = await bcrypt.hash(password, 10);

        await db.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`, [name, email, hash]);
        res.sendStatus(201);

    } catch (error) {
        console.error('Erro ao inserir usuário no banco de dados:', error.message);
        res.status(500).send({ message: error.message });
    };
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(user.rows.length === 0){
            return res.status(401).send("Usuário não cadastrado.");
        };

        const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);

        if(!isPasswordCorrect){
            return res.status(401).send("Senha incorreta.");
        };

        const token = uuid();
        const userId = user.rows[0].id;
        console.log(userId);

        await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);

        res.status(200).send({ token: token });

    } catch (error) {
        console.error('Erro ao tentar realizar login:', error.message);
        res.status(500).send({ message: error.message });
    };
};