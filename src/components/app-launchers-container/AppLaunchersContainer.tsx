import { styled } from "styled-components";
import { useAppLauncherStore } from "../../store/useAppLauncherStore";
import { AppLauncher } from "../app-launcher/AppLauncher";

const AppLaunchersContainerBox = styled.div`
    width: auto;
    height: 100%;
    background-color:#00000099;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
`;

const AppLaunchers = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
`;

const AppLauncherAddContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // overflow: hidden;
`;

const AppLaunchersContainer: React.FC = () => {
    const appLaunchers = useAppLauncherStore(state => state.appLaunchers);

    return (
        <AppLaunchersContainerBox>
            <AppLaunchers>
                {appLaunchers.filter(appLauncher => !appLauncher.modulePath).map(appLauncher => (
                    <AppLauncher key={appLauncher.appLauncherId} {...appLauncher} />
                ))}
            </AppLaunchers>
            <AppLauncherAddContainer>
                {appLaunchers.filter(appLauncher => !!appLauncher.modulePath).map(appLauncher => (
                    <AppLauncher key={appLauncher.appLauncherId} {...appLauncher} />
                ))}
            </AppLauncherAddContainer>
        </AppLaunchersContainerBox>
    )
}

export { AppLaunchersContainer };
