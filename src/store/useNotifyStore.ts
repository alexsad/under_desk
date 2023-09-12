import { create } from "zustand";
import { NotificationItem } from "../interfaces/notification";
import { genUuid } from "../util/gen_uuid";


interface useNofityStoreProps {
    isVisible: boolean,
    notifications: NotificationItem[],
    setVisible: (visible: boolean) => void,
    addNotification: (pNotification: NotificationItem) => Promise<void>;
    removeNotification: (notificationId: String) => Promise<void>;
}


const useNotifyStore = create<useNofityStoreProps>((set, get) => ({
    isVisible: false,
    notifications: [],
    setVisible: (visible: boolean) => {
        set({
            isVisible: visible,
        })
    },
    removeNotification: async (notificationId: String) => {
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
            notificationId: genUuid(),
            createAt: new Date().getTime(),
        }
        notifications.push(nNotification);
        set({
            notifications: [
                ...notifications,
            ]
        });

    },
}));


export { useNotifyStore };
