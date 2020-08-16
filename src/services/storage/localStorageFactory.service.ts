import LocalDB from "./localForageFactory.service";
import { LocalDBDrivers } from "../../types/localdb-drivers.type";
import { DEFAULT_LOCAL_STORAGE_NAME } from "../../constants/storage-names.constant";

class LocalStorageFactoryService {
    private store: LocalDB = new LocalDB(DEFAULT_LOCAL_STORAGE_NAME);

    getDefaultStore(): LocalDB {
        return this.store;
    }

    static create(storeName: string, drivers?: LocalDBDrivers): LocalDB {
        return new LocalDB(storeName, drivers);
    }
}

export default new LocalStorageFactoryService();
