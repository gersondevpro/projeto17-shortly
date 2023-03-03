import { db } from '../database/db.js';
import { nanoid } from "nanoid";

async function newUrl(req, res) {

    const { url } = req.body;
    const userId = res.locals.userId; 
    console.log(userId)

    try {

        const short = nanoid(8);

        await db.query(`INSERT INTO urls ("shortUrl", url, id_user) VALUES ($1, $2, $3)`, [short, url, userId])
        const findUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [short])

        const renderUrl = {
            id: findUrl.rows[0].id,
            shortUrl: findUrl.rows[0].shortUrl
        }

        const teste = await db.query(`SELECT * FROM urls`)
        res.status(201).send(renderUrl);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function renderUrl(req, res) {

    const url = res.locals.getUrl

    try {
        res.status(200).send(url);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function openUrl(req, res) {

    const { shortUrl } = req.params;

    try {

        const findShortUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);

        if (findShortUrl.rows[0].length === 0) {
            return res.sendStatus(404);
        };
        console.log(findShortUrl.rows[0].visitCount + 1)
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [findShortUrl.rows[0].visitCount + 1, shortUrl]);

        console.log(findShortUrl.rows[0].url)

        res.redirect(findShortUrl.rows[0].url)

    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function deleteUrl(req, res) {

    const { id } = req.params
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const findTokenAndUser = await db.query(`SELECT * FROM users WHERE token = $1`, [token]);

        if (!token || findTokenAndUser.rows.length === 0) {
            return res.sendStatus(401);
        };

        const findShortUrl = await db.query(`SELECT id_user FROM urls WHERE id = $1`, [id]);
        if (!findShortUrl.rows.length) {
            return res.sendStatus(404);
        };

        if (findTokenAndUser.rows[0].id !== parseInt(findShortUrl.rows[0].id_user)) {
            return res.sendStatus(401)
        };

        await db.query(`DELETE FROM urls WHERE id = $1`, [id])

        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message);
    };
};

export {
    newUrl,
    renderUrl,
    openUrl,
    deleteUrl
};