"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const joi_1 = __importDefault(require("joi"));
const pool_1 = __importDefault(require("../../lib/pool"));
const publisher = redis_1.default.createClient();
function createPost(username, title, content) {
    return new Promise((resolve, reject) => {
        pool_1.default.query(`INSERT INTO posts (username, title, content) VALUES('${username}', '${title}', '${content}')`, function (err, results, fields) {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
}
function getLastId() {
    return new Promise((resolve, reject) => {
        pool_1.default.query('SELECT max(id) as lastId FROM posts', function (err, results, fields) {
            if (err) {
                reject(err);
            }
            resolve(parseInt(results[0].lastId, 10));
        });
    });
}
function getPostById(id) {
    return new Promise((resolve, reject) => {
        pool_1.default.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, results, fields) {
            if (err) {
                reject(err);
            }
            resolve(results[0]);
        });
    });
}
exports.sendMessage = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        id: joi_1.default.any(),
        username: joi_1.default.string()
            .alphanum()
            .min(6)
            .required(),
        title: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
        updatedAt: joi_1.default.any(),
        createdAt: joi_1.default.any(),
    });
    const result = joi_1.default.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        console.log(result.error);
        return;
    }
    const { username, title, content } = ctx.request.body;
    try {
        const created = yield createPost(username, title, content);
        if (!created) {
            ctx.status = 400;
            return;
        }
        const lastId = yield getLastId();
        const lastPost = yield getPostById(lastId);
        yield publisher.publish('posts', JSON.stringify({
            type: 'write/RECEIVE_LAST_POST',
            payload: lastPost,
        }));
        ctx.body = {
            lastId,
        };
        ctx.status = 200;
    }
    catch (e) {
        ctx.throw(e, 500);
    }
});
