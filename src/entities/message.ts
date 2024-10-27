import { User } from "./user/user";

export interface Message {
    message_id: number;
    from: User;
    text?: string;
    date: number;
}
