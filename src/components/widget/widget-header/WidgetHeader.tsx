import { useRef } from "react";
import { styled } from "styled-components";
import { WidgetProps } from "../../../interfaces/widget";
import { Draggable } from "../../../ui/Draggable";


const WidgetHeaderBar = styled.div`
    width: 100%;
    background-color:#000000CC;
    cursor: grab;
    padding-bottom: .4rem;
    box-sizing: border-box;
`;

const WidgetHeaderLabel = styled.label`
    font-size: 1.2rem;
`;

const WidgetHeader: React.FC<WidgetProps> = (props) => {
    const dragRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable
            data={JSON.stringify({
                ...props,
                inResize: false,
            })}
            refElement={dragRef}
            onDrop={() => { }}
        >
            <WidgetHeaderBar ref={dragRef}>
                <WidgetHeaderLabel>{props.title}</WidgetHeaderLabel>
            </WidgetHeaderBar>
        </Draggable>
    )
}

export { WidgetHeader };
