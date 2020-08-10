export interface IWindowSize {
    current: number[];
    previous: number[];
}
export interface IWindowDetails {
    windowSize: number[];
    isPhone: boolean;
    isTabletPortraitUp: boolean;
    isTabletLandscapeUp: boolean;
    isDesktopUp: boolean;
    isBigDesktopUp: boolean;
}
export interface IUseWindowSizeHook {
    current: IWindowDetails;
    previous: IWindowDetails;
}
