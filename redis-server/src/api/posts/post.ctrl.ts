import { Context } from 'koa';
import redis from 'redis';
import Joi from 'joi';
import pool from '../../lib/pool';

const publisher = redis.createClient();

function createPost(
  username: string,
  title: string,
  content: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO posts (username, title, content) VALUES('${username}', '${title}', '${content}')`,
      function(err, results, fields) {
        if (err) {
          reject(err);
        }
        resolve(true);
      }
    );
  });
}

function getLastId(): Promise<number> {
  return new Promise((resolve, reject) => {
    pool.query('SELECT max(id) as lastId FROM posts', function(
      err,
      results,
      fields
    ) {
      if (err) {
        reject(err);
      }
      resolve(parseInt(results[0].lastId, 10));
    });
  });
}

function getPostById(id: number) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM posts WHERE id = ${id}`, function(
      err,
      results,
      fields
    ) {
      if (err) {
        reject(err);
      }
      resolve(results[0]);
    });
  });
}

export const sendMessage = async (ctx: Context) => {
  const schema: Joi.Schema = Joi.object().keys({
    id: Joi.any(),
    username: Joi.string()
      .alphanum()
      .min(6)
      .required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    updatedAt: Joi.any(),
    createdAt: Joi.any(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    console.log(result.error);
    return;
  }

  const { username, title, content } = (ctx as any).request.body;

  try {
    const created = await createPost(username, title, content);
    if (!created) {
      ctx.status = 400;
      return;
    }
    const lastId = await getLastId();

    const lastPost = await getPostById(lastId);

    await publisher.publish(
      'posts',
      JSON.stringify({
        type: 'write/RECEIVE_LAST_POST',
        payload: lastPost,
      })
    );

    ctx.body = {
      lastId,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
