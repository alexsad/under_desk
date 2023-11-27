import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ACTIVE_LOADING_EVENT, NOTIFY_EVENT, PROCESS_COUNT_UPDATE } from "../../events/const_events";
import { NotificationPayload } from "../../interfaces/notification";
import { MessagePayload, ProcessLoadingPayload, ProcessStatus, WidgetProps, WidgetStatus } from "../../interfaces/widget";
import { useDesktop } from "../../store/useDesktop";
import { useNotifyStore } from "../../store/useNotifyStore";
import { useProcessStore } from "../../store/useProcessStore";
import { Widget } from "../widget/Widget";

const WidgetsContainerBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow:hidden;
`;

const WidgetsContainer: React.FC = () => {
    const processes = useProcessStore(state => state.processes);
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof dropRef.current !== "undefined" && dropRef.current) {
            try {
                const { width, height } = dropRef.current.getBoundingClientRect();
                const { setDimensions } = useDesktop.getState();
                setDimensions({ width, height });
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    useEffect(() => {
        const resizeHandler = () => {
            if (typeof dropRef.current !== "undefined" && dropRef.current) {
                const { width, height } = dropRef.current.getBoundingClientRect();
                const { setDimensions } = useDesktop.getState();
                setDimensions({ width, height });
                globalThis.dispatchEvent(new CustomEvent(PROCESS_COUNT_UPDATE, {
                    bubbles: true,
                }))
            }
        }
        globalThis.addEventListener("resize", resizeHandler);
        return () => {
            globalThis.removeEventListener("resize", resizeHandler);
        }
    }, []);


    useEffect(() => {
        const processCountUpdate = async () => {
            const { processes, updateProcess } = useProcessStore.getState();
            const { dimensions } = useDesktop.getState();
            const oldProcessList = processes.filter(processItem => !processItem.modulePath && processItem.widgetStatus !== WidgetStatus.MINIMIZED);
            const widgetCount = oldProcessList.length;
            if (widgetCount > 0) {

                const customizedWidgetWidth = oldProcessList.filter(widgetItem => !widgetItem.autoResize);
                const customSize = customizedWidgetWidth.reduce((prev, curr) => {
                    if (!curr.autoResize) {
                        return curr.width + prev;
                    }
                    return prev;
                }, 0);

                const nWidth = (dimensions.width - customSize) / (widgetCount - customizedWidgetWidth.length);
                let lastLeft = 0;

                for await (const processItem of oldProcessList) {
                    processItem.width = processItem.autoResize ? nWidth : processItem.width;
                    processItem.left = lastLeft;
                    processItem.top = 0;
                    processItem.height = dimensions.height - 2;
                    lastLeft = lastLeft + processItem.width;
                    await updateProcess(processItem);
                }
            }

        }

        globalThis.addEventListener(PROCESS_COUNT_UPDATE, processCountUpdate);

        return () => {
            globalThis.removeEventListener(PROCESS_COUNT_UPDATE, processCountUpdate);
        }

    }, []);


    useEffect(() => {
        const iframeEle = globalThis;

        const loadingHandler = (processItem: WidgetProps, { payload }: ProcessLoadingPayload) => {
            const { updateProcess } = useProcessStore.getState();
            processItem.processStatus = !!payload ? ProcessStatus.LOADING : ProcessStatus.ACTIVE;
            updateProcess(processItem);
        };

        const notifyHandler = (processItem: WidgetProps, { payload }: NotificationPayload) => {
            const { addNotification } = useNotifyStore.getState();
            addNotification({
                ...payload,
                domain: processItem.uri,
                domainIconPath: processItem.iconURI || '',
            });
        };

        const messagesHandle = (evt: MessageEvent<MessagePayload>) => {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            const { getProcessByDomain } = useProcessStore.getState();
            const processItem = getProcessByDomain(evt?.origin);
            if (processItem && processItem?.processId && evt && evt.data) {
                if (evt.data.type === ACTIVE_LOADING_EVENT) {
                    loadingHandler(processItem, evt.data as ProcessLoadingPayload);
                } else if (evt.data.type === NOTIFY_EVENT) {
                    notifyHandler(processItem, evt.data as NotificationPayload);
                }
            }
        }

        iframeEle?.addEventListener('message', messagesHandle, false);

        return () => {
            iframeEle?.removeEventListener('message', messagesHandle, false);
        }

    }, []);

    return (
        <WidgetsContainerBox
            ref={dropRef}
        >
            {processes
                .map(process => (
                    <Widget
                        key={process.processId}
                        {...process}
                    />
                ))}
        </WidgetsContainerBox>
    );
}

export { WidgetsContainer };
