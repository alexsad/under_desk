import { create } from "zustand";
import { AppLauncherProps } from "../interfaces/widget";
import { genUuid } from "../util/gen_uuid";


interface useAppLauncherStoreProps {
    appLaunchers: AppLauncherProps[],
    addLauncher: (nAppLauncher: AppLauncherProps) => Promise<void>,
    updateLauncher: (appLauncher: AppLauncherProps) => Promise<void>,
}


const useAppLauncherStore = create<useAppLauncherStoreProps>((set, get) => ({
    appLaunchers: [
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/default_app_launcher.png',
            uri: 'https://m-weather.netlify.app/',
            title: 'weather app',
            description: 'weather app',
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://merge-game.netlify.app/guessit-only-logo-min.png',
            uri: 'https://merge-game.netlify.app/levels/easy',
            title: 'merge game',
            description: 'merge game',
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://spritez.netlify.app/logo192.png',
            uri: 'https://spritez.netlify.app/sprite-builder',
            title: 'spritez',
            description: 'spritez builder app',
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/default_app_launcher.png',
            uri: 'https://simple-weather-app2.netlify.app/',
            title: 'simple weather',
            description: 'simple weather app',
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
            uri: 'https://logical-operators-test.netlify.app/',
            title: 'logical operators test',
            description: 'logical operators test app',
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/default_app_launcher.png',
            uri: 'https://secret-santa-list.netlify.app/',
            title: 'secret santa list',
            description: 'secret santa list test app',
        }
    ],
    addLauncher: async (nAppLauncher: AppLauncherProps) => {
        const { appLaunchers } = get();
        nAppLauncher.appLauncherId = genUuid();
        nAppLauncher.createdAt = new Date().getDate();
        appLaunchers.push(nAppLauncher);
        set({
            appLaunchers: [
                ...appLaunchers
            ]
        })
    },
    updateLauncher: async (appLauncher: AppLauncherProps) => {
        const { appLaunchers } = get();
        const appLauncherIndex = appLaunchers.findIndex(appLauncherItem => appLauncherItem.appLauncherId === appLauncher.appLauncherId);
        if (appLauncherIndex > -1) {
            appLaunchers[appLauncherIndex] = {
                ...appLauncher
            }
            set({
                appLaunchers: [
                    ...appLaunchers
                ]
            })
        }
    }
}));


export { useAppLauncherStore };
