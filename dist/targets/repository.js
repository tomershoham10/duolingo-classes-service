import TargetModel from "./model.js";
export default class TargetRepository {
    static async createTarget(target) {
        try {
            const existingTarget = await TargetModel.findOne({ name: target.name });
            if (existingTarget) {
                throw new Error("Target already exists");
            }
            const newTarget = await TargetModel.create(target);
            return newTarget;
        }
        catch (error) {
            throw new Error(`targets repo createTarget: ${error}`);
        }
    }
    static async getTargetById(targetId) {
        try {
            const target = await TargetModel.findById(targetId);
            console.log("repo", target);
            return target;
        }
        catch (error) {
            throw new Error(`targets repo getTargetById: ${error}`);
        }
    }
    static async getAllTarget() {
        try {
            const targets = await TargetModel.find({});
            return targets;
        }
        catch (error) {
            throw new Error(`targets repo getAllTarget: ${error}`);
        }
    }
    static async updateTarget(targetId, fieldsToUpdate) {
        try {
            const updatedTarget = await TargetModel.findByIdAndUpdate(targetId, fieldsToUpdate, { new: true });
            return updatedTarget;
        }
        catch (error) {
            throw new Error(`targets repo updateTarget: ${error}`);
        }
    }
    static async deleteTarget(targetId) {
        try {
            const status = await TargetModel.findOneAndDelete({ _id: targetId });
            return status;
        }
        catch (error) {
            throw new Error(`targets repo deleteTarget: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map