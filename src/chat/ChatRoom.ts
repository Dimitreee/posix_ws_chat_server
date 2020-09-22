import uid from "uid";
import {Server, Socket} from "socket.io";

class ChatRoom {
    constructor(private server:Server) {
    }

    public enter(socket:Socket) {
        socket.join(this.id);

        this.sockets.set(socket.id, socket);
        socket.on("leave", () => this.leave(socket));
        socket.on("message", (message) => this.broadcast(message));
    }

    public getId() {
        return this.id
    }

    private leave(socket:Socket) {
        socket.leave(this.id);

        this.sockets.delete(socket.id);
        if (!this.sockets.size) {
            // TODO: удалить комнату в чат менеджере
        }
    }

    private broadcast(message) {
        this.server.to(this.id).send(message);
    }

    private sockets:Map<string, Socket> = new Map();
    private id:string = uid(32);
}
