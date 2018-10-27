require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import webSockify from 'koa-websocket';
import api from './api';
import ws from './ws';

const { PORT: port = 4000 } = process.env;

const app = webSockify(new Koa());
const router = new Router();

app.use(bodyParser());

router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(port, () => {
  console.log('app is using port', port);
});
