export const BREAKPOINT_PHONE = 599;
export const BREAKPOINT_TABLET_PORTRAIT_UP = 600;
export const BREAKPOINT_TABLET_LANDSCAPE_UP = 900;
export const BREAKPOINT_DESKTOP_UP = 1200;
export const BREAKPOINT_BIG_DESKTOP_UP = 1800;

export const isPhone = (windowWidth: number | undefined) => {
    return windowWidth ? windowWidth <= BREAKPOINT_PHONE : false;
};

export const isTabletPortraitUp = (windowWidth: number | undefined) => {
    return windowWidth ? windowWidth >= BREAKPOINT_TABLET_PORTRAIT_UP : false;
};

export const isTabletLandscapeUp = (windowWidth: number | undefined) => {
    return windowWidth ? windowWidth >= BREAKPOINT_TABLET_LANDSCAPE_UP : false;
};

export const isDesktopUp = (windowWidth: number | undefined) => {
    return windowWidth ? windowWidth >= BREAKPOINT_DESKTOP_UP : false;
};

export const isBigDesktopUp = (windowWidth: number | undefined) => {
    return windowWidth ? windowWidth >= BREAKPOINT_BIG_DESKTOP_UP : false;
};
