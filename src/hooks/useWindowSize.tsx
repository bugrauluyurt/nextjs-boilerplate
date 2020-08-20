import { useEffect, useState } from "react";
import { clone } from "lodash-es";
import { isBigDesktopUp, isDesktopUp, isPhone, isTabletLandscapeUp, isTabletPortraitUp } from "@utils/breakPoints";
import { IUseWindowSizeHook, IWindowSize } from "./useWindowSize.d";

class WindowSizeDetail {
    windowSize: number[] = [0, 0];

    isPhone = false;

    isTabletPortraitUp = false;

    isTabletLandscapeUp = false;

    isDesktopUp = false;

    isBigDesktopUp = false;

    constructor(windowSize: number[]) {
        this.windowSize = windowSize;
        this.isPhone = isPhone(windowSize[0]);
        this.isTabletPortraitUp = isTabletPortraitUp(windowSize[0]);
        this.isTabletLandscapeUp = isTabletLandscapeUp(windowSize[0]);
        this.isDesktopUp = isDesktopUp(windowSize[0]);
        this.isBigDesktopUp = isBigDesktopUp(windowSize[0]);
    }
}

const getSize = window ? () => [window.innerWidth, window.innerHeight] : () => [0, 0];

export const useWindowSize = (shouldListenWindowSize = false): IUseWindowSizeHook => {
    const [windowSize, setWindowSize] = useState({
        current: getSize(),
        previous: [0, 0],
    } as IWindowSize);

    useEffect(() => {
        if (!window) {
            return;
        }
        const handleResize = () => {
            setWindowSize((prevState: IWindowSize) => ({
                current: getSize(),
                previous: clone(prevState.current),
            }));
        };
        if (shouldListenWindowSize) {
            window.addEventListener("resize", handleResize);
        }
        return () => (shouldListenWindowSize ? window.removeEventListener("resize", handleResize) : undefined);
    }, [shouldListenWindowSize]);

    return {
        current: new WindowSizeDetail(windowSize.current),
        previous: new WindowSizeDetail(windowSize.previous),
    };
};
