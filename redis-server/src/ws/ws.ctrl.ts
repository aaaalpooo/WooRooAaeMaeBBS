import { Context } from 'koa';
import redis from 'redis';

// const publisher = redis.createClient();
const subscriber = redis.createClient();

subscriber.subscribe('posts');

export const connect = async (ctx: Context, next: any) => {
  const listener = (channel: any, message: any) => {
    ctx.websocket.send(message);
  };

  // ctx.websocket.on('message', function(message: any) {
  //   publisher.publish('posts', message);
  // });

  subscriber.on('message', listener);

  ctx.websocket.on('close', () => {
    subscriber.removeListener('message', listener);
  });
  //   try {
  //     //
  //     await pool.query(
  //       "insert into accounts (username, password, email) values('testing1234', 'ehdgh3333', 'testing@naver.com')"
  //     );
  //     const result = await pool.query('SELECT * FROM accounts');
  //     ctx.body = result;
  //     ctx.status = 200;
  //   } catch (e) {
  //     ctx.throw(e, 500);
  //   }
};
