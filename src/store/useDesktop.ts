import { create } from "zustand";

interface configDimensions {
    width: number,
    height: number,
}

interface useDesktopProps {
    dimensions: configDimensions,
    setDimensions: (dimensions: configDimensions) => void,
}

const useDesktop = create<useDesktopProps>((set, get) => ({
    dimensions: {
        width: 800,
        height: 800,
    },
    setDimensions: (dimensions: configDimensions) => {
        set({
            dimensions,
        })
    },
}));

export { useDesktop };
