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
        const shortUrls = await db.query(`SELECT * FROM urls WHERE "userId" = $1 ORDER BY id;`, [user.rows[0].id]);


        const shortenedUrls = [];
        for (let i = 0; i < shortUrls.rows.length; i++) {
            const shortenedUrl = {
                "id": shortUrls.rows[i].id,
                "shortUrl": shortUrls.rows[i].shorturl,
                "url": shortUrls.rows[i].url,
                "visitCount": shortUrls.rows[i].visits
            };
            shortenedUrls.push(shortenedUrl);
        }

        const result = {
            "id": user.rows[0].id,
            "name": user.rows[0].username,
            "visitCount": visitsTotal.rows[0].visitCount,
            "shortenedUrls": shortenedUrls
        };
        

        console.log(result);

        res.status(200).send(result);

    } catch (error) {
        console.log('Erro ao pegar informações do usuário:', error.message);
        res.status(500).send({ message: error.message });
    }
}

export async function getRanking(req, res) {
    try {
        const rankingQuery = await db.query(`
        SELECT u.id, u.username AS "name", COALESCE(SUM(url.visits), 0) AS "visitCount", COUNT(url.id) AS "linksCount"
        FROM users AS u
        LEFT JOIN urls AS url ON u.id = url."userId"
        GROUP BY u.id, u.username
        ORDER BY COALESCE(SUM(url.visits), 0) DESC
        LIMIT 10;
      `);

        const rankingUsers = rankingQuery.rows.map((row) => ({
            id: row.id,
            name: row.name,
            visitCount: row.visitCount,
            linksCount: row.linksCount
        }));

        for (const user of rankingUsers) {
            await db.query(
                `INSERT INTO ranking (id, name, "visitCount", "linksCount") VALUES ($1, $2, $3, $4);`,
                [user.id, user.name, user.visitCount, user.linksCount]
            );
        };

        res.status(200).send(rankingUsers);
    } catch (error) {
        console.log('Erro ao pegar informações do ranking:', error.message);
        res.status(500).send({ message: error.message });
    };
};


