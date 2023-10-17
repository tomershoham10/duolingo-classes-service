import ClassesModel from "./model.js";
export default class ClassesRepository {
    static async createClass(reqClass) {
        const newClass = await ClassesModel.create(reqClass);
        return newClass;
    }
    static async getClassById(classId) {
        const resClass = await ClassesModel.findById(classId);
        console.log("classes repo", classId);
        return resClass;
    }
    static async getAllClasses() {
        const classes = await ClassesModel.find({});
        return classes;
    }
    static async updateClass(classId, fieldsToUpdate) {
        const updatedClass = await ClassesModel.findByIdAndUpdate(classId, fieldsToUpdate, { new: true });
        return updatedClass;
    }
    static async deleteClass(classId) {
        const status = await ClassesModel.findOneAndDelete({ _id: classId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map