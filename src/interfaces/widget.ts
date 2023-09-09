export enum WidgetStatus {
    HIDDEN,
    MINIMIZED,
    MAXIMIZED,
    RESTORED,
}

export enum ProcessStatus {
    ACTIVE,
    INACTIVE,
    LOADING,
}

export interface AppLauncherProps {
    appLauncherId?: string,
    createdAt?: number,
    iconURI?: string,
    uri: string,
    title: string,
    description: string,
}

export interface WidgetProps extends AppLauncherProps {
    processId?: string,
    processStatus: ProcessStatus,
    startedAt?: number,
    widgetStatus: WidgetStatus,
    top: number,
    left: number,
    width: number,
    height: number,
    inResize?: boolean,
}