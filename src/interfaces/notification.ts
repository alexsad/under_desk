import { MessagePayload } from "./widget";

export enum NotificationType {
    INFO,
    WARN,
    ERROR,
    SECURITY,
}

export interface NotificationItem {
    notificationId?: string,
    createAt: number,
    expiresAt: number,
    title: string,
    msg: string,
    type: NotificationType,
    domain: string,
    domainIconPath: string,
}

export interface NotificationPayload extends MessagePayload {
    payload: NotificationItem,
}
