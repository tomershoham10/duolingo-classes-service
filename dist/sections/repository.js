import SectionsModel from "./model.js";
export default class SectionsRepository {
    static async createSection(section) {
        const newSection = await SectionsModel.create(section);
        return newSection;
    }
    static async getSectionById(sectionId) {
        const section = await SectionsModel.findById(sectionId);
        console.log("sections repo", sectionId);
        return section;
    }
    static async getAllSections() {
        const sections = await SectionsModel.find({});
        return sections;
    }
    static async updateSection(sectionId, fieldsToUpdate) {
        const updatedSection = await SectionsModel.findByIdAndUpdate(sectionId, fieldsToUpdate, { new: true });
        return updatedSection;
    }
    static async deleteSection(sectionId) {
        const status = await SectionsModel.findOneAndDelete({ _id: sectionId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map