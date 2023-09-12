import { MessagePayload } from "./widget";

export enum NotificationType {
    WARN,
    INFO,
    ERROR,
}

export interface NotificationItem {
    notificationId?: string,
    createAt: number,
    expiresAt: number,
    title: string,
    msg: string,
    type: NotificationType,
    domain: string,
}

export interface NotificationPayload extends MessagePayload {
    payload: NotificationItem,
}
