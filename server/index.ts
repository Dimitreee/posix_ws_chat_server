import Http from "http";
import SocketIO from "socket.io";
import {WsProxy} from "./src/WsProxy";

const HTTP_SERVER = Http.createServer();

const io_options =  {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
};

export const io = new SocketIO(HTTP_SERVER, io_options);

new WsProxy(io).init();
