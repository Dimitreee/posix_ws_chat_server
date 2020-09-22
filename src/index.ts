import { Socket } from "socket.io";


export class SocketController {
    constructor(private io:Socket) {
    }

    public init() {
        this.io.on("connection", (socket) => {
            socket.on("register", () => {

            });

            socket.on("message", () => {
                socket.emit("respond", { hello: "Hey, Mr.Client!" });
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        });
    }
}
