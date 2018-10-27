"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_websocket_1 = __importDefault(require("koa-websocket"));
const api_1 = __importDefault(require("./api"));
const ws_1 = __importDefault(require("./ws"));
const { PORT: port = 4000 } = process.env;
const app = koa_websocket_1.default(new koa_1.default());
const router = new koa_router_1.default();
app.use(koa_bodyparser_1.default());
router.use('/api', api_1.default.routes());
app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws_1.default.routes()).use(ws_1.default.allowedMethods());
app.listen(port, () => {
    console.log('app is using port', port);
});
