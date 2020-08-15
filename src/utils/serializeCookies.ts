const serializeCookies = (cookies: { [key: string]: string }): string => {
    return Object.keys(cookies).reduce((acc, cookieKey, index) => {
        const serializedCookie = `${cookieKey}=${cookies[cookieKey]};`;
        if (!index) {
            return serializedCookie;
        }
        return `${acc} ${serializedCookie}`;
    }, "");
};

export default serializeCookies;
