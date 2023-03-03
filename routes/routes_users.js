import { Router } from "express";
import { checkLogin, validateUser } from "../middlewares/usersValidates_middleware.js";
import { createUser, checkUser, userComplete, rankingVisit } from "../controllers/users_controllers.js";

const users = Router();

users.post('/signup', validateUser, createUser);
users.post('/signin', checkLogin, checkUser);
users.get('/users/me', userComplete);
users.get('/ranking', rankingVisit)

export {
    users
}