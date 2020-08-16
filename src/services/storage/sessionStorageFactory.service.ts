/* eslint-disable no-underscore-dangle */
import sessionStorageWrapper from "localforage-sessionstoragewrapper";
import LocalDB from "./localForageFactory.service";
import { LocalDBDrivers } from "../../types/localdb-drivers.type";
import { DEFAULT_SESSION_STORAGE_NAME } from "../../constants/storage-names.constant";

class SessionStorageFactoryService {
    static sessionStorageDriver: LocalDBDrivers = { [sessionStorageWrapper._driver]: sessionStorageWrapper };

    private store: LocalDB = new LocalDB(
        DEFAULT_SESSION_STORAGE_NAME,
        SessionStorageFactoryService.sessionStorageDriver
    );

    getDefaultStore(): LocalDB {
        return this.store;
    }

    static create(storeName: string): LocalDB {
        return new LocalDB(storeName, { [sessionStorageWrapper._driver]: sessionStorageWrapper });
    }
}

export default new SessionStorageFactoryService();
