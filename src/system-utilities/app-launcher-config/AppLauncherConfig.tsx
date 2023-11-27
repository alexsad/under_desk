import { FormEvent, useRef } from "react";
import styled from "styled-components";
import { AppLauncherProps, WidgetProps } from "../../interfaces/widget";
import { useAppLauncherStore } from "../../store/useAppLauncherStore";
import { useProcessStore } from "../../store/useProcessStore";
import { FormButton, FormGroup, FormInput, FormLabel } from "../../ui/FormElements";

const AppLauncherConfigBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const AppLauncherConfig: React.FC<WidgetProps> = ({ processId, processParentId, appLauncherId }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { getProcess, stopProcess } = useProcessStore.getState();
    const parentProcess = processParentId ? getProcess(processParentId) : undefined;

    const saveLauncherHandler = async (event: FormEvent) => {
        event.preventDefault();
        const { addLauncher, updateLauncher } = useAppLauncherStore.getState();
        const appLauncherform = formRef?.current;
        if (appLauncherform) {
            const launcherProps: AppLauncherProps = {
                title: appLauncherform.app_launcher_name?.value,
                description: appLauncherform.app_launcher_description?.value,
                uri: appLauncherform.app_launcher_uri?.value,
                iconURI: appLauncherform.app_launcher_iconURI?.value,
                width: Number(appLauncherform.app_launcher_width?.value),
                height: Number(appLauncherform.app_launcher_height?.value),
                autoResize: appLauncherform.app_launcher_uri?.checked,
            }

            console.log('form:', appLauncherform.app_launcher_autoResize?.checked);

            if (parentProcess && appLauncherId) {
                launcherProps.appLauncherId = parentProcess.appLauncherId;
                await updateLauncher({
                    ...launcherProps,
                });
            } else {
                await addLauncher(launcherProps);
            }
            if (processId) {
                await stopProcess(processId);
            }
        }
    }

    return (
        <AppLauncherConfigBox ref={formRef} onSubmit={saveLauncherHandler}>
            <FormGroup>
                <FormLabel>Name:</FormLabel>
                <FormInput id="app_launcher_name" type="text" defaultValue={parentProcess?.title} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Description:</FormLabel>
                <FormInput id="app_launcher_description" type="text" defaultValue={parentProcess?.description} />
            </FormGroup>
            <FormGroup>
                <FormLabel>URL:</FormLabel>
                <FormInput id="app_launcher_uri" type="text" defaultValue={parentProcess?.uri} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Icon URL:</FormLabel>
                <FormInput id="app_launcher_iconURI" type="text" defaultValue={parentProcess?.iconURI} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Resize:</FormLabel>
                <FormInput id="app_launcher_autoResize" type="checkbox" defaultChecked={parentProcess?.autoResize} />
            </FormGroup>
            <FormGroup>
                <FormLabel>width:</FormLabel>
                <FormInput id="app_launcher_width" type="number" min="200" max="1000" defaultValue={Math.min(Math.floor(parentProcess?.width || 200), 1000)} />
            </FormGroup>
            <FormGroup>
                <FormLabel>height:</FormLabel>
                <FormInput disabled id="app_launcher_height" type="number" min="200" max="600" defaultValue={Math.min(Math.floor(parentProcess?.height || 350), 600)} />
            </FormGroup>
            <FormGroup>
                <FormButton>
                    Save
                </FormButton>
            </FormGroup>
        </AppLauncherConfigBox>
    );
}


export default AppLauncherConfig;
