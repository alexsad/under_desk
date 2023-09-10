import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import bellIcon from "../../ui/assets/bell.png";

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

const StatusItem = styled.div`
    width: 16px;
    height: 16px;
    background-image: url(${bellIcon});
    background-position: center center;
    background-repeate: no-repeat;
    background-size:cover;
    filter: invert(100%);
    // background-color: #000000DD;
`;

const SessionTimeDisplayContent = styled.div`
    font-size: 1rem;
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
            <StatusItem />
            <SessionTimeDisplay />
        </DesktopStatusBarBox>
    )
}

export { DesktopStatusBar };
