import classNames from "classnames";
import { styled } from "styled-components";
import { ProcessStatus, WidgetProps } from "../../interfaces/widget";
import reloadIcon from "../../ui/assets/reload.png";
import { WidgetHeader } from "./widget-header/WidgetHeader";
import { WidgetResize } from "./widget-resize/WidgetResize";

const WidgetBox = styled.div`
    width: 250px;
    height: 250px;
    position: absolute;
    border: 1px solid #000000CC;
    background-color:#f8ffe97a;
    display: flex;
    flex-direction: column;
    &.isActive{
        background-color:#fff;
    }
`;

const WidgetContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    background-color: #00000047;
    &.isActive{
        background-color:blue;
    }
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
`;

const Widget: React.FC<WidgetProps> = (props) => {

    return (
        <WidgetBox
            className={
                classNames({ isActive: props.processStatus === ProcessStatus.ACTIVE })
            }
            style={{
                top: `${props.top}px`,
                left: `${props.left}px`,
                width: `${props.width}px`,
                height: `${props.height}px`,
            }}
        >
            <WidgetHeader {...props} />
            <WidgetContainer>
                {props.processStatus === ProcessStatus.LOADING && (
                    <LoadingBox>
                        <LoadingIcon />
                    </LoadingBox>
                )}
                <ContentIframe src={props.uri} />
                <WidgetResize {...props} />
            </WidgetContainer>
        </WidgetBox>
    );
}


export { Widget };
