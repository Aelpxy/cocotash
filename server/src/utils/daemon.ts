import { daemon } from './axios';

class DaemonClient {
    private readonly daemonInstance: typeof daemon;

    constructor() {
        this.daemonInstance = daemon;
    }

    public async getDatabaseLiveLogs(id: string) {
        return await this.daemonInstance.get("/db/live/" + id)
    }

    public async getDatabaseMetrics(id: string) {
        return await this.daemonInstance.get("/db/metrics/" + id)
    }

    public async getDatabase(id: string) {
        return await this.daemonInstance.get("/db/" + id)
    }

    public async createDatabase(type: 'postgres' | 'redis') {
        return await this.daemonInstance.post("/db/" + type)
    }

    public async deleteDatabase(id: string) {
        return await this.daemonInstance.delete("/db/" + id)
    }
}

const daemonClient = new DaemonClient();

export { daemonClient };
