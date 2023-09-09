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
`;

const AppLaunchersContainer: React.FC = () => {
    const appLaunchers = useAppLauncherStore(state => state.appLaunchers);
    return (
        <AppLaunchersContainerBox>
            {appLaunchers.map(appLauncher => (
                <AppLauncher key={appLauncher.appLauncherId} {...appLauncher} />
            ))}
        </AppLaunchersContainerBox>
    )
}

export { AppLaunchersContainer };
