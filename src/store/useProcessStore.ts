import { create } from "zustand";
import { WidgetProps } from "../interfaces/widget";
import { genUuid } from "../util/gen_uuid";


interface useProcessStoreProps {
    processes: WidgetProps[],
    addProcess: (nProcess: WidgetProps) => Promise<WidgetProps>,
    updateProcess: (process: WidgetProps) => Promise<void>,
    getProcess: (processId: string) => WidgetProps | undefined,
}


const useProcessStore = create<useProcessStoreProps>((set, get) => ({
    processes: [],
    addProcess: async (nProcess: WidgetProps) => {
        const { processes } = get();
        nProcess.processId = genUuid();
        nProcess.startedAt = new Date().getDate();
        processes.push(nProcess);
        set({
            processes: [
                ...processes
            ]
        });
        return nProcess;
    },
    updateProcess: async (process: WidgetProps) => {
        const { processes } = get();
        const processIndex = processes.findIndex(processItem => processItem.processId === process.processId);
        if (processIndex > -1) {
            processes[processIndex] = {
                ...process
            }
            set({
                processes: [
                    ...processes
                ]
            })
        }
    },
    getProcess: (processId: string) => {
        const { processes } = get();
        return processes.find(processItem => processItem.processId === processId);
    },
}));


export { useProcessStore };
