import ClassesRepository from "./repository.js";
export default class ClassesManager {
    static async createClass(reqClass) {
        const response = await ClassesRepository.createClass(reqClass);
        return response;
    }
    static async getClassById(classId) {
        const resClass = await ClassesRepository.getClassById(classId);
        console.log("classes manager", resClass);
        return resClass;
    }
    static async getAllClasses() {
        const classes = await ClassesRepository.getAllClasses();
        return classes;
    }
    static async updateClass(classId, filedsToUpdate) {
        const updatedClass = await ClassesRepository.updateClass(classId, filedsToUpdate);
        return updatedClass;
    }
    static async deleteClass(classId) {
        const status = await ClassesRepository.deleteClass(classId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map