import {Server, Socket} from "socket.io";
import {io} from "../index";
import uid from "uid";
import {SocketEvent} from "./types";

class Chat {
    constructor(private id:string) {
        console.log(`Chat with ${id} created.`)
    }

    public enter(socket:Socket) {
        socket.join(this.id);

        this.sockets.set(socket.id, socket);
        socket.on(SocketEvent.Message, (message) => this.broadcast(message));
        socket.on(SocketEvent.Leave, () => this.leave(socket));
    }

    private leave(socket:Socket) {
        socket.leave(this.id);

        this.sockets.delete(socket.id);
        if (!this.sockets.size) {
            // TODO: удалить комнату в чат менеджере
        }
    }

    private broadcast(message) {
        this.socket.to(this.id).send(message);
    }

    private socket:Server = io;

    private sockets:Map<string, Socket> = new Map();
}
