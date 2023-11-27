import { create } from "zustand";
import { NotificationItem } from "../interfaces/notification";
import { genUUID } from "../util/gen_uuid";


interface useNofityStoreProps {
    isVisible: boolean,
    notifications: NotificationItem[],
    setVisible: (visible: boolean) => void,
    addNotification: (pNotification: NotificationItem) => Promise<void>;
    removeNotification: (notificationId: string) => Promise<void>;
}


const useNotifyStore = create<useNofityStoreProps>((set, get) => ({
    isVisible: false,
    notifications: [],
    setVisible: (visible: boolean) => {
        set({
            isVisible: visible,
        })
    },
    removeNotification: async (notificationId: string) => {
        const { notifications } = get();
        const notificationIndex = notifications.findIndex(notificationItem => notificationItem.notificationId === notificationId);
        if (notificationIndex > -1) {
            notifications.splice(notificationIndex, 1);
        }
        set({
            notifications: [
                ...notifications,
            ]
        });
    },
    addNotification: async (pNotification: NotificationItem) => {
        const { notifications } = get();
        const nNotification = {
            ...pNotification,
            notificationId: genUUID(),
            createAt: new Date().getTime(),
        }
        notifications.unshift(nNotification);
        set({
            notifications: [
                ...notifications,
            ]
        });

    },
}));


export { useNotifyStore };
