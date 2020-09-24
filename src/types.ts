export enum EventActions {
    CreateChat = "create_chat",
    DeleteChat = "delete_chat",
}

export enum EventType {
    Message = "message",
    Action = "action",
}

export type Message = {
    type: EventType;
    payload: string;
};
