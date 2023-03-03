import express from 'express';
import { users } from '../routes/routes_users.js';
import { urls } from '../routes/routes_urls.js';

const app = express();
app.use(express.json());
app.use(users);
app.use(urls);

app.listen(5000, () => console.log('Server running in port 5000'));