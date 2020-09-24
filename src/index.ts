import {Socket} from "socket.io";
import {Message, EventType, EventActions} from "./types";
import {createChat} from "./Chat";

export class WSProxy {
    constructor(private io:Socket) {
    }

    public init() {
        this.io.on("connection", (socket) => {
            this.attachSocketListeners(socket);

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        });
    }

    private attachSocketListeners(socket) {
        socket.on("event", (message:Message) => {
            switch (message.type) {
                case EventType.Action:
                    this.actionEventListener(message.payload);
                    break;
                default:
                    break;
            }
        })
    }

    private actionEventListener(message:string) {
        switch (message) {
            case EventActions.CreateChat:
                createChat();
                break;
            default:
                break;
        }
    }
}
