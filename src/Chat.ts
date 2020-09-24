import {Socket} from "socket.io";
import {io} from "../server";
import uid from "uid";

class Chat {
    constructor(private id:string) {
    }

    public enter(socket:Socket) {
        socket.join(this.id);

        this.sockets.set(socket.id, socket);
        socket.on("leave", () => this.leave(socket));
        socket.on("message", (message) => this.broadcast(message));
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

    private socket:Socket = io;

    private sockets:Map<string, Socket> = new Map();
}

export function createChat() {
    const id = uid(32);
    const chat = new Chat(id);

    chats.set(id, chat);
}

const chats = new Map();
