import { styled } from "styled-components";
import { AppLaunchersContainer } from "../components/app-launchers-container/AppLaunchersContainer";
import { DesktopStatusBar } from "../components/desktop-status-bar/DesktopStatusBar";
import { WidgetsContainer } from "../components/widgets-container/WidgetsContainer";

const MainContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    display: flex;
    flex-direction: column;
`;

const DesktopContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const Main: React.FC = () => {
    return (
        <MainContainer>
            <DesktopStatusBar />
            <DesktopContainer>
                <AppLaunchersContainer />
                <WidgetsContainer />
            </DesktopContainer>
        </MainContainer>
    );
}

export { Main };
