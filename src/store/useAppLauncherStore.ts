import { create } from "zustand";
import { AppLauncherProps } from "../interfaces/widget";
import { genUuid } from "../util/gen_uuid";

interface useAppLauncherStoreProps {
    appLaunchers: AppLauncherProps[],
    addLauncher: (nAppLauncher: AppLauncherProps) => Promise<void>,
    updateLauncher: (appLauncher: AppLauncherProps) => Promise<void>,
    getLauncher: (appLauncherId: string) => AppLauncherProps | undefined,
}

const useAppLauncherStore = create<useAppLauncherStoreProps>((set, get) => ({
    appLaunchers: [
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://cdn-icons-png.flaticon.com/128/831/831268.png',
            uri: 'https://m-weather.netlify.app/',
            title: 'weather app',
            description: 'weather app',
            width: 463,
            height: 690,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://merge-game.netlify.app/guessit-only-logo-min.png',
            uri: 'https://merge-game.netlify.app/levels/easy',
            title: 'merge game',
            description: 'merge game',
            width: 300,
            height: 600,
        },
        // {
        //     appLauncherId: genUuid(),
        //     createdAt: new Date().getTime(),
        //     iconURI: 'https://spritez.netlify.app/logo192.png',
        //     uri: 'https://spritez.netlify.app/sprite-builder',
        //     title: 'spritez',
        //     description: 'spritez builder app',
        //     width: 1200,
        //     height: 800,
        // },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://cdn-icons-png.flaticon.com/128/9502/9502324.png',
            uri: 'https://simple-weather-app2.netlify.app/',
            title: 'simple weather',
            description: 'simple weather app',
            width: 400,
            height: 800,
        },
        // {
        //     appLauncherId: genUuid(),
        //     createdAt: new Date().getTime(),
        //     iconURI: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        //     uri: 'https://logical-operators-test.netlify.app/',
        //     title: 'logical operators test',
        //     description: 'logical operators test app',
        //     width: 1200,
        //     height: 800,
        // },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://secret-santa-list.netlify.app/img/icons/favicon-32x32.png',
            uri: 'https://secret-santa-list.netlify.app/',
            title: 'secret santa list',
            description: 'secret santa list test app',
            width: 400,
            height: 500,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://www.shareicon.net/data/48x48/2015/07/25/74796_notepad_256x256.png',
            uri: 'https://notepad.pw/under-desktop',
            title: 'notepad_pw',
            description: 'simple notepad to share',
            width: 530,
            height: 600,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'https://ferrugemjs.github.io/digital-pomodoro/assets/icons/icon-64x64.png',
            uri: 'https://ferrugemjs.github.io/digital-pomodoro/',
            title: 'digital pomodoro',
            description: 'A basic digital pomodoro',
            width: 300,
            height: 400,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/default_app_launcher.png',
            uri: 'https://under-desk-module-test.netlify.app/',
            // uri: 'http://127.0.0.1:8080',
            title: 'test app events',
            description: 'test app events',
            width: 300,
            height: 400,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/add_app_launcher.png',
            uri: '',
            modulePath: 'app-launcher-config/AppLauncherConfig',
            title: 'launcher config',
            description: 'config app launcher',
            width: 300,
            height: 420,
        },
        {
            appLauncherId: genUuid(),
            createdAt: new Date().getTime(),
            iconURI: 'assets/activity_monitor2.png',
            uri: '',
            modulePath: 'app-monitoring/AppMonitoring',
            title: 'apps running',
            description: 'see all running apps',
            width: 700,
            height: 420,
        },
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
    },
    getLauncher: (appLauncherId: string) => {
        const { appLaunchers } = get();
        return appLaunchers.find(appLauncherItem => appLauncherItem.appLauncherId === appLauncherId);
    }
}));


export { useAppLauncherStore };
