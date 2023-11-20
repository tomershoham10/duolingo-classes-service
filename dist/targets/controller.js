import TargetManager from "./manager.js";
export default class TargetController {
    static async create(req, res, next) {
        try {
            const { name, countryId, type, subType } = req.body;
            const reqTarget = { name: name, countryId: countryId, type: type, subType: subType };
            console.log("TargetController create - reqTarget", reqTarget);
            const newTarget = await TargetManager.createTarget(reqTarget);
            res
                .status(201)
                .json({ message: "Target registered successfully", newTarget });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const targetId = req.params.id;
            console.log("controller", targetId);
            const target = await TargetManager.getTargetById(targetId);
            if (!target) {
                return res.status(404).json({ message: "Target not found" });
            }
            res.status(200).json({ target });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            console.log("target controller getAll");
            const targets = await TargetManager.getAllTarget();
            console.log(targets);
            res.status(200).json({ targets });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const targetId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedTarget = await TargetManager.updateTarget(targetId, fieldsToUpdate);
            if (!updatedTarget) {
                return res.status(404).json({ message: "Target not found" });
            }
            res.status(200).json({ updatedTarget });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const targetId = req.params.id;
            const deletedTarget = await TargetManager.deleteTarget(targetId);
            if (!deletedTarget) {
                return res.status(404).json({ message: "Target not found" });
            }
            res.status(200).json({ deletedTarget });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map