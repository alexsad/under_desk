import classNames from "classnames";
import React, { Suspense, useEffect } from "react";
import { styled } from "styled-components";
import { ProcessStatus, WidgetProps, WidgetStatus } from "../../interfaces/widget";
import { useNotifyStore } from "../../store/useNotifyStore";
import { useProcessStore } from "../../store/useProcessStore";
import reloadIcon from "../../ui/assets/reload.png";
import { WidgetHeader } from "./widget-header/WidgetHeader";

const WidgetBox = styled.div`
    width: 250px;
    height: 250px;
    position: absolute;
    border: 1px solid #000000CC;
    background-color:#dbdbdb47;
    display: flex;
    flex-direction: column;
    &.isActive{
        background-color:#dbdbdbFF;
    }
`;

const WidgetContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
`;

const LoadingBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: #00000066;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`;

const LoadingIcon = styled.div`
    width: 24px;
    height: 24px;

    background-image:url(${reloadIcon});
    background-repeat: no-repeat;
    background-position: center center;
    animation: rotate-loading 1s linear infinite;

    @keyframes rotate-loading {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }
`;

const ContentIframe = styled.iframe`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
`;

const BackModalScreen = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #000000aa;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LazyUtilityLauncher: React.FC<WidgetProps> = (props) => {
    const LazyComp = React.lazy(() => import(`../../system-utilities/${props.modulePath}`));
    return (
        <Suspense fallback={
            <LoadingBox>
                <LoadingIcon />
            </LoadingBox>
        }>
            <LazyComp {...props} />
        </Suspense>
    );
}

const WidgetIframe: React.FC<WidgetProps> = (props) => {
    return (
        <ContentIframe src={props.uri} />
    )
}

const WidgetItem: React.FC<WidgetProps> = (props) => {
    const isAnUtility = !!props?.modulePath;
    const isMinimized = props?.widgetStatus === WidgetStatus.MINIMIZED;

    const baseStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        display: isMinimized ? 'none' : 'flex',
        visibility: isMinimized ? 'hidden' : 'visible',
        position: isAnUtility ? 'relative' : 'absolute',
    } as React.CSSProperties;

    if (!isAnUtility) {
        baseStyle.top = `${props.top}px`;
        baseStyle.left = `${props.left}px`;
    }

    useEffect(() => {
        const { setVisible } = useNotifyStore.getState();
        if (isAnUtility) {
            setVisible(false);
        }
    }, [isAnUtility]);

    useEffect(() => {
        const { updateProcess, getProcess } = useProcessStore.getState();
        if (props.processId) {
            setTimeout(() => {
                if (props.processId) {
                    const processCreated = getProcess(props.processId);
                    if (processCreated && processCreated.processStatus !== ProcessStatus.ACTIVE) {
                        updateProcess({
                            ...processCreated,
                            processStatus: ProcessStatus.ACTIVE,
                        });
                    }
                }
            }, 2000);
        }
    }, [props.processId]);

    return (
        <WidgetBox
            className={
                classNames({ isActive: props.processStatus === ProcessStatus.ACTIVE })
            }
            style={{
                ...baseStyle,
            }}
        >
            <WidgetHeader {...props} />
            <WidgetContainer>
                {props.processStatus === ProcessStatus.LOADING && (
                    <LoadingBox>
                        <LoadingIcon />
                    </LoadingBox>
                )}
                {isAnUtility && (
                    <LazyUtilityLauncher {...props} />
                )}
                {!isAnUtility && (
                    <WidgetIframe {...props} />
                )}
                {/* <WidgetResize {...props} /> */}
            </WidgetContainer>
        </WidgetBox>
    );
}


const Widget: React.FC<WidgetProps> = (props) => {
    const isAnUtility = !!props?.modulePath;

    if (isAnUtility) {
        return (
            <BackModalScreen>
                <WidgetItem {...props} />
            </BackModalScreen>
        )
    }

    return (<WidgetItem {...props} />);
}


export { Widget };
