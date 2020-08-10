// eslint-disable-next-line max-classes-per-file
import * as localForage from "localforage";

const DB_DEFAULT = "citrusnotes";
const STORE_DEFAULT = "application";

const LocalForageDefaultDrivers = [
    localForage.INDEXEDDB,
    localForage.WEBSQL,
    localForage.LOCALSTORAGE,
];

class LocalDB {
    private storeName: string;

    private drivers: string[] = LocalForageDefaultDrivers;

    private store: LocalForage;

    private storeDriverPromise: Promise<void>;

    private ready = false;

    constructor(storeName: string, drivers?: string[]) {
        if (!storeName) {
            throw new Error("Localstore name should be provided");
        }
        this.storeName = storeName;
        this.drivers = drivers || LocalForageDefaultDrivers;
        this.store = localForage.createInstance({
            name: DB_DEFAULT,
            storeName,
        });
        this.storeDriverPromise = this.store
            .setDriver(this.drivers)
            .then(() => {
                this.ready = true;
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
}

class LocalStorageFactory {
    private store: LocalDB = new LocalDB(STORE_DEFAULT);

    getDefaultStore(): LocalDB {
        return this.store;
    }

    static create(storeName: string): LocalDB {
        return new LocalDB(storeName);
    }
}

export default new LocalStorageFactory();
