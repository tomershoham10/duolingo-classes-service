import ClassesRepository from "./repository.js";

export default class ClassesManager {
    static async createClass(
        reqClass: Partial<ClassesType>): Promise<ClassesType> {
        const response = await ClassesRepository.createClass(reqClass);
        return response
    }

    static async getClassById(classId: string): Promise<ClassesType | null> {
        const resClass = await ClassesRepository.getClassById(classId);
        console.log("classes manager", resClass);
        return resClass;
    }

    static async getAllClasses(): Promise<ClassesType[] | null> {
        const classes = await ClassesRepository.getAllClasses();
        return classes;
    }

    static async updateClass(
        classId: string,
        filedsToUpdate: Partial<ClassesType>
    ): Promise<ClassesType | null> {
        const updatedClass = await ClassesRepository.updateClass(
            classId,
            filedsToUpdate
        );
        return updatedClass;
    }

    static async deleteClass(classId: string): Promise<ClassesType | null> {
        const status = await ClassesRepository.deleteClass(classId);
        return status;
    }
}
