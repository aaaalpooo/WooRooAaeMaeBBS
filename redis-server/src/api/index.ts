import Router from 'koa-router';
// import ws from './ws';
import posts from './posts';

const api = new Router();

api.use('/posts', posts.routes());

export default api;
