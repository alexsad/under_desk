import { create } from "zustand";
import { WidgetProps } from "../interfaces/widget";
import { genUuid } from "../util/gen_uuid";

interface useProcessStoreProps {
    processes: WidgetProps[],
    addProcess: (nProcess: WidgetProps) => Promise<WidgetProps>,
    updateProcess: (process: WidgetProps) => Promise<void>,
    getProcess: (processId: string) => WidgetProps | undefined,
    stopProcess: (processId: string) => Promise<void>,
    getProcessByAppLauncherId: (appLauncherId: string) => WidgetProps | undefined,
    getProcessByDomain: (url: string) => WidgetProps | undefined,
}

const useProcessStore = create<useProcessStoreProps>((set, get) => ({
    processes: [],
    addProcess: async (nProcess: WidgetProps) => {
        const { processes } = get();
        nProcess.processId = genUuid();
        nProcess.startedAt = new Date().getTime();
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
    getProcessByAppLauncherId: (appLauncherId: string) => {
        const { processes } = get();
        return processes.find(processItem => processItem.appLauncherId === appLauncherId);
    },
    getProcessByDomain: (purl: string) => {
        const { processes } = get();
        const { host } = new URL(purl);
        return processes.find(processItem => processItem?.uri?.includes(host));
    },
    stopProcess: async (processId: string) => {
        const { getProcess, processes } = get();
        const processItemFound = getProcess(processId);
        if (processItemFound) {
            const processIndex = processes.findIndex(processItem => processItem.processId === processId);
            if (processIndex > -1) {
                processes.splice(processIndex, 1);
                set({
                    processes: [
                        ...processes,
                    ]
                })
            }
        }
    },
}));


export { useProcessStore };
