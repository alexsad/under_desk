import { styled } from "styled-components";
import { useAppLauncherStore } from "../../store/useAppLauncherStore";
import { AppLauncher, AppLauncherBox } from "../app-launcher/AppLauncher";

const AppLaunchersContainerBox = styled.div`
    width: auto;
    height: 100%;
    background-color:#00000099;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const AppLaunchers = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const AppLauncherAddContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;



const AppLaunchersContainer: React.FC = () => {
    const appLaunchers = useAppLauncherStore(state => state.appLaunchers);

    const onClickCreateAppLauncherHandler = () => { }
    return (
        <AppLaunchersContainerBox>
            <AppLaunchers>
                {appLaunchers.map(appLauncher => (
                    <AppLauncher key={appLauncher.appLauncherId} {...appLauncher} />
                ))}
            </AppLaunchers>
            <AppLauncherAddContainer>
                <AppLauncherBox
                    style={{
                        backgroundImage: 'url(assets/add_app_launcher.png)',
                    }}
                    onClick={onClickCreateAppLauncherHandler}
                    title={"add app launcher"}
                />
            </AppLauncherAddContainer>
        </AppLaunchersContainerBox>
    )
}

export { AppLaunchersContainer };
