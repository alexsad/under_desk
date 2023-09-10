import { styled } from "styled-components";
import { AppLauncherProps, ProcessStatus, WidgetStatus } from "../../interfaces/widget";
import { useProcessStore } from "../../store/useProcessStore";
import { genUuid } from "../../util/gen_uuid";

const AppLauncherBox = styled.div`
    width: 52px;
    height: 52px;
    background-color: #291324;
    margin: .5rem;
    border-radius: 10px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;

`;

const AppLauncher: React.FC<AppLauncherProps> = ({ iconURI, ...props }) => {

    const onClickHandler = async () => {
        const { addProcess, updateProcess, getProcess } = useProcessStore.getState();
        const nProcess = {
            ...props,
            iconURI,
            processId: genUuid(),
            height: 600,
            width: 400,
            left: 200,
            top: 50,
            processStatus: ProcessStatus.LOADING,
            widgetStatus: WidgetStatus.RESTORED,
        };
        const { processId } = await addProcess(nProcess);
        if (processId) {
            setTimeout(() => {
                const processCreated = getProcess(processId);
                if (processCreated) {
                    updateProcess({
                        ...processCreated,
                        processStatus: ProcessStatus.ACTIVE,
                    })
                }
            }, 2000);
        }
    }

    return (
        <AppLauncherBox
            style={{
                backgroundImage: `url(${iconURI})`,
            }}
            onClick={onClickHandler}
            title={props.title}
        >
        </AppLauncherBox>
    )
}

export { AppLauncher, AppLauncherBox };

