import { db } from "../database/database.js";
import { nanoid } from "nanoid";

export async function postUrlShorten(req, res) {
    const { url } = req.body;
    let token = req.header('Authorization').replace('Bearer ', '');

    token = token.replace(/"/g, '');

    if (!token) {
        return res.status(401).send({ error: 'Token de autenticação ausente ou inválido.' });
    };

    try {
        const user = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        const userId = user.rows[0].userId;

        const shortUrl = nanoid(8);
        
        await db.query(`INSERT INTO urls (url, shorturl, "userId") VALUES ($1, $2, $3)`, [url, shortUrl, userId]);

        const response = await db.query(`SELECT * FROM urls WHERE url = $1`, [url]);
        res.status(201).send(
            {
                id: response.rows[0].id,
                shortUrl: response.rows[0].shorturl
            }
        );
    } catch (error) {
        console.error('Erro ao criar uma shortUrl:', error.message);
        res.status(500).send({ message: error.message });
    };
};