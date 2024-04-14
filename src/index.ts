import express, { Express, Request, Response } from 'express';
const path = require('node:path');
import os from 'os';

import llng from './api/llng';

const app: Express = express();
const port: number = 3000;

app.use('/llng', llng);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response): void => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        res.json(req.headers);
    } else {
        // if (req.headers.cookie) {
        //     req.headers.cookie = req.headers.cookie.replace(/[;,]/, "<br>");
        // }
        res.render('headers', {
            host: os.hostname(),
            headers: req.headers,
            remoteAddress: req.socket.remoteAddress,
        });
    }
});

app.listen(port, (): void => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
