import { useRef } from "react";
import { styled } from "styled-components";
import { PROCESS_COUNT_UPDATE } from "../../../events/const_events";
import { WidgetProps, WidgetStatus } from "../../../interfaces/widget";
import { useAppLauncherStore } from "../../../store/useAppLauncherStore";
import { useProcessStore } from "../../../store/useProcessStore";
import cogIcon from "../../../ui/assets/cog_16x16.png";

const WidgetHeaderBar = styled.div`
    width: 100%;
    background-color:#000000CC;
    padding: .2rem .2rem .4rem .2rem;
    border: 1px solid #2c2c2c;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`;

const WidgetHeaderLabel = styled.label`
    width: 100%;
    text-align: center;
    cursor: default;
`;

const ActionBtns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: normal;
    align-content: baseline;
    align-items: center;
`;

const BaseBtn = styled.div`
    width: 14px;
    height: 14px;
    background-color: #ccc;
    cursor: default;
    margin: 0 .1rem 0 .1rem;
    background-repeat: no-repeat;
    background-position: center center;
`;

const CloseBtn = styled(BaseBtn)`
    cursor: pointer;
    background-color: #914e4e;
`;

const MaxBtn = styled(BaseBtn)`
    cursor: pointer;
    background-color: #537b58;
`;

const MinBtn = styled(BaseBtn)`
    cursor: pointer;
    background-color: #a88e00;
`;

const ConfigBtn = styled(BaseBtn)`
    cursor: pointer;
   background-image:url(${cogIcon});
   width: 16px;
   height: 16px;
   background-color: transparent;
   filter:invert(100%);
`;

const AppIcon = styled(BaseBtn)`
   width: 16px;
   height: 16px;
   background-color: transparent;
   background-size: contain;
`;

const WidgetHeader: React.FC<WidgetProps> = (props) => {
    const dragRef = useRef<HTMLDivElement>(null);
    const isAnUtility = !!props.modulePath;

    const updateProcessCount = () => {
        globalThis.dispatchEvent(new CustomEvent(PROCESS_COUNT_UPDATE, {
            bubbles: true,
        }))
    }

    const onCloseHandler = async () => {
        const { stopProcess } = useProcessStore.getState();
        if (props.processId) {
            await stopProcess(props.processId);
            updateProcessCount();
        }
    }

    const onConfigHandler = async () => {
        const { addProcess } = useProcessStore.getState();
        const { appLaunchers } = useAppLauncherStore.getState();
        const configLauncher = appLaunchers.find(appLauncherItem => appLauncherItem.modulePath === "app-launcher-config/AppLauncherConfig");
        if (configLauncher) {
            await addProcess({
                ...configLauncher as WidgetProps,
                processParentId: props.processId,
            });
        }
    }

    const onMinHandler = async () => {
        const { updateProcess } = useProcessStore.getState();
        const upProcs = {
            ...props,
            widgetStatus: WidgetStatus.MINIMIZED,
        }
        await updateProcess(upProcs);
        updateProcessCount();
    }

    const onMaxHandler = async () => {
        const { updateProcess, processes } = useProcessStore.getState();
        const allProcessList = processes.filter(processItem => !processItem.modulePath);
        for await (const processItem of allProcessList) {
            processItem.widgetStatus = processItem.processId === props.processId ? WidgetStatus.MAXIMIZED : WidgetStatus.MINIMIZED;
            await updateProcess(processItem);
        }
        updateProcessCount();
    }

    return (
        <WidgetHeaderBar ref={dragRef}>
            <ActionBtns>
                <AppIcon style={{ backgroundImage: `url(${props.iconURI})` }} />
                {!isAnUtility && (
                    <ConfigBtn onClick={onConfigHandler} />
                )}
            </ActionBtns>
            <WidgetHeaderLabel>{props.title}</WidgetHeaderLabel>
            <ActionBtns>
                {!isAnUtility && (
                    <MaxBtn onClick={onMaxHandler} />
                )}
                {!isAnUtility && (
                    <MinBtn onClick={onMinHandler} />
                )}
                <CloseBtn onClick={onCloseHandler} />
            </ActionBtns>
        </WidgetHeaderBar>
    )
}

export { WidgetHeader };
