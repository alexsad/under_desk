import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { NotifyPool } from "./notification-bar/NotificationBar";

const DesktopStatusBarBox = styled.div`
    width: 100vw;
    height: 2rem;
    background-color: #000000CC;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    flex-direction: row;
    align-items: center;
    padding-right: .5rem;
    box-sizing: border-box;
`;

const SessionTimeDisplayContent = styled.div`
    padding-left: .5rem;
`;


const SessionTimeDisplay: React.FC = () => {
    const startTime = useRef(new Date().getTime());
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDuration(oldDuration => new Date().getTime() - startTime.current);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <SessionTimeDisplayContent>
            {Math.ceil(duration / 1000)}s
        </SessionTimeDisplayContent>
    )
}

const DesktopStatusBar: React.FC = () => {
    return (
        <DesktopStatusBarBox>
            <NotifyPool />
            <SessionTimeDisplay />
        </DesktopStatusBarBox>
    )
}

export { DesktopStatusBar };
