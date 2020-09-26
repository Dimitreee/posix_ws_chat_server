export enum SocketEvent {
    Connection = "connection",
    Disconnect = "disconnect",
    End = "end",
    Leave = "leave",
    Message = "message",
}

export type Message = {
    room_id: string;
    message: string;
}
