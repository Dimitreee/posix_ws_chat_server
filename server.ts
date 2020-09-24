import express from "express";
import {WSProxy} from "./src";

const http = require("http").createServer(express());
const Server = require("socket.io");

const io_options =  {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
};

export const io = new Server(http, io_options);
new WSProxy(io).init();

http.listen(3000, () => {
    console.log("Server ready");
});
