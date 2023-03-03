import { Router } from "express";
import { deleteUrl, newUrl, openUrl, renderUrl } from "../controllers/urls_controllers.js";
import { validateGetUrl, validateUrls } from "../middlewares/urlsValidates_middleware.js";

const urls = Router();

urls.post('/urls/shorten', validateUrls, newUrl);
urls.get('/urls/:id', validateGetUrl, renderUrl);
urls.get('/urls/open/:shortUrl', openUrl);
urls.delete('/urls/:id', deleteUrl);

export {
    urls
};