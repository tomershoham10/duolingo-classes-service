import LessonsModel from "../lessons/model.js";
import SectionsModel from "./model.js";
export default class SectionsRepository {
    static async createSection(section) {
        try {
            const newSection = await SectionsModel.create(section);
            return newSection;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async getSectionById(sectionId) {
        try {
            const section = await SectionsModel.findById(sectionId);
            console.log("sections repo", sectionId);
            return section;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async getsLessonsByUnitId(sectionId) {
        try {
            const section = await SectionsModel.findById(sectionId);
            if (section) {
                const lessonsIds = section.lessons;
                const lessonsDetails = await LessonsModel.find({ _id: { $in: lessonsIds } });
                if (lessonsIds) {
                    const lessonsInOrder = lessonsIds.map((id) => lessonsDetails.find(lesson => lesson._id.equals(id)));
                    console.log("sections repo getsLessonsByUnitId", sectionId);
                    return lessonsInOrder;
                }
            }
            else
                return null;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async getAllSections() {
        try {
            const sections = await SectionsModel.find({});
            return sections;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async updateSection(sectionId, fieldsToUpdate) {
        try {
            const updatedSection = await SectionsModel.findByIdAndUpdate(sectionId, fieldsToUpdate, { new: true });
            return updatedSection;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
    static async deleteSection(sectionId) {
        try {
            const status = await SectionsModel.findOneAndDelete({ _id: sectionId });
            return status;
        }
        catch (err) {
            throw new Error(`Error repo getsLessonsByUnitId: ${err}`);
        }
    }
}
//# sourceMappingURL=repository.js.map