import { db } from "../database/db.js";
import joi from 'joi';
import { urlSchemaCreate } from "../schemas/urls_schemas.js";

async function validateUrls(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const findTokenAndUser = await db.query(`SELECT * FROM users WHERE token = $1`, [token]);
    console.log(findTokenAndUser.rows[0])

    if (!token || findTokenAndUser.rows.length === 0) {
        return res.sendStatus(401);
    };

    const urlValidation = urlSchemaCreate.validate(req.body, { abortEarly: false });
    if (urlValidation.error) {
        const mapError = urlValidation.error.details.map(e => e.message);
        return res.status(422).send(mapError); 
    };

    res.locals.userId = findTokenAndUser.rows[0].id

    next()
}

async function validateGetUrl(req, res, next) {
    const { id } = req.params;

    const url = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

    if (!url.rows.length) {
        return res.sendStatus(404);
    };

    const rendUrl = {
        id: url.rows[0].id,
        shortUrl: url.rows[0].shortUrl,
        url: url.rows[0].url
    };

    res.locals.getUrl = rendUrl;

    next()
}

export {
    validateUrls,
    validateGetUrl
}