import express from "express";
import {WsProxy} from "./src/WsProxy";

const http = require("http").createServer(express());
const Server = require("socket.io");

const io_options =  {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
};

export const io = new Server(http, io_options);
new WsProxy(io).init();

http.listen(3000, () => {
    console.log("Server ready");
});
