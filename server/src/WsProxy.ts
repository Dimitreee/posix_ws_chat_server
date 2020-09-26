import {Socket} from "socket.io";
import {Message, EventType, EventActions} from "./types";
import {createChat, enterChat} from "./Chat";

export class WsProxy {
    constructor(private io:Socket) {
    }

    public init() {
        this.io.on("connection", (socket:Socket) => {
            console.log("connected: ", socket.id);
            this.attachListeners(socket);

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        });
    }

    private attachListeners(socket) {
        socket.on("event", (message:Message) => {
            console.log(message);
            if (message.type === EventType.Action) {
                switch (message.payload) {
                    case EventActions.CreateChat:
                        createChat();
                        break;
                    case EventActions.EnterChat:
                        enterChat(message.payload, socket);
                        break;
                    default:
                        break;
                }
            }
        })
    }
}
