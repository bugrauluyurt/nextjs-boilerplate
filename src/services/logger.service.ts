export type LogTypes = "error" | "normal";

export class LoggerService {
    static readonly ERROR_PREFIX: string = "[LOGGER] ERROR: \n";

    static logFn(log: any, type: LogTypes): void {
        switch (type) {
            case "error":
                return console.error(LoggerService.ERROR_PREFIX, log);
            default:
                return console.log("[LOGGER]", log);
        }
    }

    static log(log: any, type: LogTypes = "normal", bypassEnvCheck = false): void {
        // @TODO: Enable this log method on prod with query param
        if (process.env.NODE_ENV === "production" && !bypassEnvCheck) {
            return;
        }
        LoggerService.logFn(log, type);
    }
}
