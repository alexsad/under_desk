import { useEffect, useState } from "react";
import styled from "styled-components";
import { PROCESS_COUNT_UPDATE } from "../../events/const_events";
import { useProcessStore } from "../../store/useProcessStore";
import killIcon from "../../ui/assets/clear.png";
import { formatTime, msToTime } from "../../util/time";

const AppMonitoringBox = styled.div`

`;

const AppIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-top: .2rem;
`;

const KillAppIcon = styled(AppIcon)`
    cursor: pointer;
    filter: invert(100%);
`;

const TableApps = styled.table`
    width: 100%;
    text-align: left;
    padding:.5rem;

    & > thead > tr > th {
        font-weight: 500;

        &.metricNumbers{
            text-align: right;
        }
    }

    & > tbody > tr > th {
        font-weight: 300;

        &.metricNumbers{
            text-align: right;
        }
        &.isCenter{
            text-align: center;
        }
    }
`;

interface SimplePBarProps {
    $progressPercent: number,
}

const SimplePBar = styled.div<SimplePBarProps>`
    background-color: #00000030;
    width: 100px;
    height: 14px;
    float: right;
    position: relative;
    &:after{
        content: "";
        position: absolute;
        top:0;
        right:0;
        height: 100%;
        width: ${props => Math.min(props.$progressPercent * 100, 100)}%;
        background-color: ${props => props.$progressPercent > .8 ? '#bf8a1a' : '#9cf999'} ;
    }
`;

interface MemoryEntry {
    initiatorType: string,
    name: string,
    duration: number,
    startTime: number,
}

const AppMonitoring: React.FC = () => {
    const { getProcessByDomain, stopProcess } = useProcessStore();
    const [, setIncrement] = useState(0);
    const perfomanceEntries = (performance.getEntries() as unknown as MemoryEntry[])
        .filter(itemMem => {
            if (itemMem["initiatorType"] !== "iframe") {
                return false;
            }
            const processItem = getProcessByDomain(itemMem.name);
            return !!processItem;
        })
        .map(({ name, duration, startTime }, indexEntry) => {
            const processItem = getProcessByDomain(name);
            return {
                name: processItem?.title,
                domain: new URL(name).host,
                duration,
                startTime,
                iconUrl: processItem?.iconURI || '',
                processId: processItem?.processId || `${indexEntry}`,
                startedAt: processItem?.startedAt || new Date().getTime(),
            }
        });

    const highValue = perfomanceEntries.reduce((prev, curr) => Math.max(prev, curr.duration), 0);

    const killAppHandler = (processId: string) => async () => {
        await stopProcess(processId);
        globalThis.dispatchEvent(new CustomEvent(PROCESS_COUNT_UPDATE, {
            bubbles: true,
        }))
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIncrement(old => old + 1);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <AppMonitoringBox>
            <TableApps>
                <thead>
                    <tr>
                        <th></th>
                        <th>app</th>
                        <th>domain</th>
                        <th className="metricNumbers">usage</th>
                        <th className="metricNumbers">duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {perfomanceEntries.map(performanceEntry => {
                        const [mins, secs] = msToTime(new Date().getTime() - performanceEntry.startedAt);
                        return (
                            <tr key={performanceEntry.processId}>
                                <th>
                                    <AppIcon src={performanceEntry.iconUrl} />
                                </th>
                                <th>{performanceEntry.name}</th>
                                <th>{performanceEntry.domain}</th>
                                <th className="metricNumbers">
                                    <SimplePBar $progressPercent={performanceEntry.duration / highValue} />
                                </th>
                                <th className="metricNumbers">{formatTime(mins)}m{formatTime(secs)}s</th>
                                <th className="isCenter">
                                    <KillAppIcon
                                        src={killIcon}
                                        onClick={killAppHandler(performanceEntry.processId)}
                                    />
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </TableApps>
        </AppMonitoringBox>
    );
}

export default AppMonitoring;