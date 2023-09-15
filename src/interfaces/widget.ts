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
    modulePath?: string,
    title: string,
    description: string,
    width: number,
    height: number,
    autoResize: boolean,
}

export interface WidgetProps extends AppLauncherProps {
    processId?: string,
    processStatus: ProcessStatus,
    startedAt?: number,
    widgetStatus: WidgetStatus,
    top: number,
    left: number,
    inResize?: boolean,
    processParentId?: string,
}

export interface MessagePayload {
    type: string,
}

export interface ProcessLoadingPayload extends MessagePayload {
    payload: boolean,
}