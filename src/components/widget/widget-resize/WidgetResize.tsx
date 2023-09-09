import { useRef } from "react";
import { styled } from "styled-components";
import { WidgetProps } from "../../../interfaces/widget";
import { Draggable } from "../../../ui/Draggable";

const ResizeIcon = styled.div`
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid black;
    position: absolute;
    right: -10px;
    bottom: -10px;
    cursor: nwse-resize;
`;

const WidgetResize: React.FC<WidgetProps> = (props) => {
    const dragRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable
            data={JSON.stringify({
                ...props,
                inResize: true,
            })}
            refElement={dragRef}
            onDrop={() => { }}
        >
            <ResizeIcon ref={dragRef} data-resize-item="true" />
        </Draggable>
    )
}

export { WidgetResize };
