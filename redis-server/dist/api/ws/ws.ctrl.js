"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let counter = 0;
exports.connect = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.websocket.id = counter++;
    ctx.websocket.send(`Hello, user ${ctx.websocket.id}`);
    ctx.websocket.on('message', function (message) {
        console.log(message);
        ctx.websocket.send('ping');
    });
    ctx.websocket.on('close', () => {
        console.log(`User ${ctx.websocket.id} has left.`);
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
