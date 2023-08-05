import { db } from "../database/database.js";

export async function getUserById(req, res) {
    let token = req.header('Authorization').replace('Bearer ', '');
    token = token.replace(/"/g, '');

    if (!token) {
        return res.status(401).send({ error: 'Token de autenticação ausente ou inválido.' });
    };

    try {
        const sessionQuery = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        const user = await db.query(`SELECT * FROM USERS WHERE id = $1;`, [sessionQuery.rows[0].userId]);

        const visitsTotal = await db.query(`SELECT SUM(visits) AS "visitCount" FROM urls WHERE "userId" = $1;`, [user.rows[0].id]);
        const shortUrls = await db.query(`SELECT * FROM urls WHERE "userId" = $1 ORDER BY visits DESC;`, [user.rows[0].id]);

        const result = {
            "id": user.rows[0].id,
            "name": user.rows[0].username,
            "visitCount": visitsTotal.rows[0].visitCount,
            "shortenedUrls": shortUrls.rows
        };

        res.status(200).send(result);

    } catch (error) {
        console.log('Erro ao pegar informações do usuário:', error.message);
        res.status(500).send({ message: error.message });
    }
}

