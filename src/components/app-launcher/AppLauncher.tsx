import classNames from "classnames";
import { styled } from "styled-components";
import { PROCESS_COUNT_UPDATE } from "../../events/const_events";
import { AppLauncherProps, ProcessStatus, WidgetStatus } from "../../interfaces/widget";
import { useProcessStore } from "../../store/useProcessStore";
import { genUuid } from "../../util/gen_uuid";

const AppLauncherBox = styled.div`
    background-color: #291324;
    margin: .2rem .5rem .2rem .5rem;
    border-radius: 0px;
    padding: .3rem;
    position: relative;
    &:hover{
        background-color: #5c5c5ccc;
    }
    &.hasProcess{
        background-color: #5c5c5c;
        &:hover{
            background-color: #8c8121;
        }
        &:after{
            content: "";
            width: 5px;
            height: 5px;
            background-color: #d9ce94;
            position: absolute;
            left: -5px;
            top: calc(50% - 5px);
            border-radius: 50%;
        }
        &:before{
            content: "";
            width: 100%;
            height: 55%;
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 0% 0% 150% 150% / 0% 0% 40% 40%;
            z-index: 0;
        }
    }

`;

const AppLauncherIcon = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 48px;
    height: 48px;
    background-color: #393939;
`;

const AppLauncher: React.FC<AppLauncherProps> = ({ iconURI, ...props }) => {
    const { getProcessByAppLauncherId } = useProcessStore();

    const hasProcess = !!getProcessByAppLauncherId(props?.appLauncherId || '');

    const onClickHandler = async () => {
        const { addProcess, updateProcess } = useProcessStore.getState();
        if (!hasProcess) {
            const nProcess = {
                ...props,
                iconURI,
                processId: genUuid(),
                left: 200,
                top: 50,
                processStatus: ProcessStatus.LOADING,
                widgetStatus: WidgetStatus.RESTORED,
            };
            await addProcess(nProcess);
        } else {
            const oldProcessItem = getProcessByAppLauncherId(props?.appLauncherId || '');
            if (oldProcessItem) {
                oldProcessItem.widgetStatus = WidgetStatus.RESTORED;
                await updateProcess(oldProcessItem);
            }
        }
        globalThis.dispatchEvent(new CustomEvent(PROCESS_COUNT_UPDATE, {
            bubbles: true,
        }))
    }

    return (
        <AppLauncherBox
            onClick={onClickHandler}
            title={props.title}
            className={classNames({
                'hasProcess': hasProcess
            })}
        >
            <AppLauncherIcon
                style={{
                    backgroundImage: `url(${iconURI})`,
                }}
            />
        </AppLauncherBox>
    )
}

export { AppLauncher, AppLauncherBox };

