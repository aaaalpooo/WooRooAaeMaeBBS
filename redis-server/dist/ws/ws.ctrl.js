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
// const publisher = redis.createClient();
const subscriber = redis_1.default.createClient();
subscriber.subscribe('posts');
exports.connect = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const listener = (channel, message) => {
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
});
