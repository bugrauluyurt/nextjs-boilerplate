// eslint-disable-next-line max-classes-per-file
import * as localForage from "localforage";
import { includes as _includes, isEmpty as _isEmpty } from "lodash-es";
import { LoggerService } from "../logger.service";
import { LocalDBDrivers } from "../../types/localdb-drivers.type";

const DB_DEFAULT = "__cn_app_db";

const LocalForageDefaultDrivers = [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE];

export default class LocalDB {
    private storeName: string;

    private drivers: string[] = LocalForageDefaultDrivers;

    private store: LocalForage;

    private storeDriverPromise: Promise<void>;

    private ready = false;

    constructor(storeName: string, drivers?: LocalDBDrivers) {
        if (!storeName) {
            throw new Error("Localstore name should be provided...");
        }

        this.storeName = storeName;
        this.drivers = _isEmpty(drivers) ? LocalForageDefaultDrivers : Object.keys(drivers);
        this.store = localForage.createInstance({
            name: DB_DEFAULT,
            storeName,
        });

        this.storeDriverPromise = LocalDB.defineDrivers(drivers).then(() => {
            return this.store.setDriver(this.drivers).then(() => {
                // eslint-disable-next-line prettier/prettier
                LoggerService.log(`[Storage] LocalDB with storeName->${storeName}, drivers->${JSON.stringify(drivers)} ready...`);
                this.ready = true;
            });
        });
    }

    getStoreName(): string {
        return this.storeName;
    }

    getDrivers(): string[] {
        return this.drivers;
    }

    getItem(key: string): Promise<any> {
        return this.store.getItem(key);
    }

    getStoreDriverPromise(): Promise<void> {
        return this.storeDriverPromise;
    }

    setItem(key: string, value: string): Promise<any> {
        return this.store.setItem(key, value);
    }

    isReady(): boolean {
        return this.ready;
    }

    static defineDrivers(drivers: LocalDBDrivers): Promise<any> {
        const driverPromiseBatch = Object.keys(drivers).map(driverName => {
            const driver = drivers[driverName];
            if (!LocalDB.isExternalDriver(driverName)) {
                return Promise.resolve();
            }
            return localForage.defineDriver(driver);
        });
        return Promise.all(driverPromiseBatch);
    }

    static isExternalDriver(driver: string): boolean {
        return !_includes(LocalForageDefaultDrivers, driver);
    }
}
