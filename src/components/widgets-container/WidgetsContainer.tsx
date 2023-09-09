import { useRef } from "react";
import { styled } from "styled-components";
import { WidgetProps } from "../../interfaces/widget";
import { useProcessStore } from "../../store/useProcessStore";
import { Droppable, IDroppableEvent } from "../../ui/Draggable";
import { Widget } from "../widget/Widget";

const WidgetsContainerBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;


const WidgetsContainer: React.FC = () => {
    const processes = useProcessStore(state => state.processes);
    const dropRef = useRef<HTMLDivElement>(null);

    const onDropHandler = (data: string, { mousePosition }: IDroppableEvent) => {

        try {
            const processData = JSON.parse(data) as WidgetProps;
            const { updateProcess } = useProcessStore.getState();
            if (processData.inResize) {
                processData.height = (mousePosition.y - processData.top);
                processData.width = (mousePosition.x - processData.left);
            } else {
                processData.top = mousePosition.y - 30;
                processData.left = mousePosition.x;
            }
            updateProcess(processData);
        } catch (error) {

        }
    }

    return (
        <WidgetsContainerBox
            ref={dropRef}
        >
            <Droppable
                onDrop={onDropHandler}
                refElement={dropRef}
            >
                {processes.map(process => (
                    <Widget
                        key={process.processId}
                        {...process}
                    />
                ))}
            </Droppable>
        </WidgetsContainerBox>
    );
}

export { WidgetsContainer };
