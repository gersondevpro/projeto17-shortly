import { db } from "../database/db.js";
import { userSchemaCreate, loginSchema } from "../schemas/users_schemas.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

async function validateUser(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    const validateUser = userSchemaCreate.validate(req.body, { abortEarly: false });
    if (validateUser.error) {
        const mapError = validateUser.error.details.map(e => e.message);
        return res.status(422).send(mapError);
    }

    if (password !== confirmPassword) {
        return res.status(422).send("Password e confirmPassword devem ser dados idênticos!");
    };

    const passowrdHash = bcrypt.hashSync(password, 10);

    const findEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (findEmail.rows.length > 0) {
        return res.sendStatus(409);
    }

    res.locals.pass = passowrdHash;

    next()
}

async function checkLogin(req, res, next) {
    const { email, password } = req.body;

    const validateLogin = loginSchema.validate(req.body, { abortEarly: false });
    if (validateLogin.error) {
        const mapError = validateLogin.error.details.map(e => e.message);
        return res.status(422).send(mapError);
    };

    const findUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (findUser.rows.length === 0) {
        return res.sendStatus(401);
    };

    const checkPass = bcrypt.compareSync(password, findUser.rows[0].password)
    console.log(checkPass)
    if (!checkPass) {
        return res.sendStatus(401);
    };

    const token = uuidV4();
    console.log(token)

    res.locals.createToken = token

    next()
}

export {
    validateUser,
    checkLogin
}