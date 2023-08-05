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
        console.log('Erro ao criar uma shortUrl:', error.message);
        res.status(500).send({ message: error.message });
    };
};

export async function getUrlId(req, res) {
    const { id } = req.params;
    try {

        const urls = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        console.log(urls.rows[0], id);

        if (urls.rows.length === 0) {
            return res.status(404).send("ShortUrl inexistente.");
        };

        res.status(200).send({
            id: urls.rows[0].id,
            shortUrl: urls.rows[0].shorturl,
            url: urls.rows[0].url
        });

    } catch (error) {
        console.log("Erro ao pegar as Urls:", error.message);
        res.status(500).send({ message: error.message });
    };
};

export async function getUrlOpen(req, res) {
    const { shortUrl } = req.params;
    try {
        const urlQuery = await db.query(`SELECT * FROM urls WHERE shorturl = $1;`, [shortUrl]);
        const urlData = urlQuery.rows[0];

        if(!urlData){
            return res.status(404).send("ShortUrl inexistente.");
        };

        const newVisitCount = urlData.visits + 1;
        await db.query(`UPDATE urls SET visits = $1 WHERE id = $2;`, [newVisitCount, urlData.id]);
        
        res.redirect(urlData.url);
        
    } catch(error) {
        console.log("Erro ao redirecionar para a Url:", error.message);
        res.status(500).send({ message: error.message });
    }
}

export async function deleteById(req, res) {
    const { id } = req.params;
    let token = req.header('Authorization').replace('Bearer ', '');

    token = token.replace(/"/g, '');

    if (!token) {
        return res.status(401).send({ error: 'Token de autenticação ausente ou inválido.' });
    };

    try {
        const userQuery = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        const userId = userQuery.rows[0].userId;

        const urlQuery = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        const urlData = urlQuery.rows[0];

        if(!urlData){
            return res.status(404).send("ShortUrl inexistente.");
        };

        if(userId !== urlData.userId) {
            return res.status(401).send("Essa shortUrl pertence a outro usuário.")
        }

        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);

        res.sendStatus(204);

    } catch(error) {
        console.log('Erro ao deletar uma Url:', error.message);
        res.status(500).send({ message: error.message });
    }
}