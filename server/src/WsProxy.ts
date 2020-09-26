import {Server, Socket} from "socket.io";
import {SocketEvent} from "./types";

export type StoreAPI = {
    set: (id:string, item:any) => void;
    delete: (id:string) => void;
}

export function createStore():StoreAPI {
    const in_memory_store:Map<string, any> = new Map();

    return {
        set: (key, value) => in_memory_store.set(key, value),
        delete: (key) =>  in_memory_store.delete(key),
    }
}

export class WsProxy {
    constructor(private io:Server, private store = createStore()) {
    }

    public init():void {
        this.io.on(SocketEvent.Connection, (socket:Socket) => {
            this.attachSocket(socket.id, socket);
            socket.emit("connected", socket.id);

            socket.on(SocketEvent.End, () => {
                this.detachSocket(socket.id);
                socket.disconnect();
            });

            socket.on(SocketEvent.Disconnect, () => {
                // TODO(ddanev): implement later
            });
        });
    }

    private attachSocket(id:string, socket:Socket) {
        this.store.set(id, socket)
    }

    private detachSocket(id:string) {
        this.store.delete(id)
    }
}
