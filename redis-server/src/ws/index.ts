import Router from 'koa-router';
import * as wsCtrl from './ws.ctrl';

const ws = new Router();

ws.get('/ws', wsCtrl.connect);

export default ws;
