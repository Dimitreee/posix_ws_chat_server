import {StolenAdapter} from "./src/Adapter";
import express from "express";
import {SocketController} from "./src";

const http = require("http").createServer(express());
const Server = require("socket.io");

const io_options =  {
    adapter: StolenAdapter,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
};

const io = new Server(http, io_options);
const socket_controller = new SocketController(io);

socket_controller.init();
http.listen(3000, () => {
    console.log("Server ready");
});

// 1)   User can connect to the server
// 2)   User can see all connected users
// 3)   User can send message to user
// 4)   User can receive message from user
// 5)   User can disconnect from server
