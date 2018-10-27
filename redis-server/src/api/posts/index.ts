import Router from 'koa-router';
import * as postCtrl from './post.ctrl';

const posts = new Router();

posts.post('/', postCtrl.sendMessage);

export default posts;
