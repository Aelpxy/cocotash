import { daemon } from './axios';

class DaemonClient {
    private readonly daemonInstance: typeof daemon;

    constructor() {
        this.daemonInstance = daemon;
    }

    public async getDatabaseLiveLogs() {

    }

    public async getDatabase() {

    }

    public async getDatabases() {

    }

    public async createDatabase() {

    }

    public async updateDatabase() {

    }

    public async deleteDatabase() {
        
    }
}

const daemonClient = new DaemonClient();

export { daemonClient };
