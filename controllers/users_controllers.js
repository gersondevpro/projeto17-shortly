import { db } from '../database/db.js';

async function createUser(req, res) {

    const { name, email } = req.body;
    const pass = res.locals.pass;

    try {
        await db.query(`INSERT INTO users (name, email, password) values ($1, $2, $3)`, [name, email, pass]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }

};

async function checkUser(req, res) {
    const { email } = req.body;
    const token = res.locals.createToken
    try {
        await db.query(`UPDATE users SET token = $1 WHERE email = $2`, [token, email]);
        const findToken = await db.query(`SELECT token FROM users WHERE email = $1`, [email]);

        res.status(200).send(findToken.rows[0]);
    } catch (error) {
        res.status(500).send(error.message)
    };
};

async function userComplete(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const findTokenAndUser = await db.query(`SELECT * FROM users WHERE token = $1`, [token]);

        if (!token || findTokenAndUser.rows.length === 0) {
            return res.sendStatus(401);
        };

        const shorts = await db.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE id_user = $1 ORDER BY id ASC`, [findTokenAndUser.rows[0].id])

        const mapSumVisitCount = shorts.rows.map(urls => urls.visitCount);
        console.log(mapSumVisitCount)

        let sum = 0
        for (let i = 0; i < mapSumVisitCount.length; i++) {
            sum += mapSumVisitCount[i]
        }

        const render = {
            id: findTokenAndUser.rows[0].id,
            name: findTokenAndUser.rows[0].name,
            visitCount: sum,
            shortenedUrls: shorts.rows
        }

        res.status(200).send(render);

    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function rankingVisit(req, res) {

    try {

        const rankingVisitCount = await db.query(`
        SELECT users.id, users.name, count(urls.id) AS "linksCount", sum(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls
        ON users.id = urls.id_user
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `)

        res.status(200).send(rankingVisitCount.rows)

    } catch (error) {
        res.status(500).send(error.message);
    };
};

export {
    createUser,
    checkUser,
    userComplete,
    rankingVisit
}