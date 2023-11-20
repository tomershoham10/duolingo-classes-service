import TargetRepository from "./repository.js";
export default class TargetManager {
    static async createTarget(target) {
        try {
            const response = await TargetRepository.createTarget(target);
            return response;
        }
        catch (error) {
            throw new Error(`targets manager createTarget: ${error}`);
        }
    }
    static async getTargetById(targetId) {
        try {
            const target = await TargetRepository.getTargetById(targetId);
            console.log("manager", target);
            return target;
        }
        catch (error) {
            throw new Error(`targets manager getTargetById: ${error}`);
        }
    }
    static async getAllTarget() {
        try {
            const targets = await TargetRepository.getAllTarget();
            return targets;
        }
        catch (error) {
            throw new Error(`targets manager getAllTarget: ${error}`);
        }
    }
    static async updateTarget(targetId, filedsToUpdate) {
        try {
            const updatedTarget = await TargetRepository.updateTarget(targetId, filedsToUpdate);
            return updatedTarget;
        }
        catch (error) {
            throw new Error(`targets manager updateTarget: ${error}`);
        }
    }
    static async deleteTarget(targetId) {
        try {
            const status = await TargetRepository.deleteTarget(targetId);
            return status;
        }
        catch (error) {
            throw new Error(`targets manager deleteTarget: ${error}`);
        }
    }
}
//# sourceMappingURL=manager.js.map