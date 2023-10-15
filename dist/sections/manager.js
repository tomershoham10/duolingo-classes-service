import SectionsRepository from "./repository.js";
export default class SectionsManager {
    static async createSection(section) {
        const response = await SectionsRepository.createSection(section);
        return response;
    }
    static async getSectionById(sectionId) {
        const section = await SectionsRepository.getSectionById(sectionId);
        console.log("sections manager", section);
        return section;
    }
    static async getAllSections() {
        const sections = await SectionsRepository.getAllSections();
        return sections;
    }
    static async updateSection(sectionId, filedsToUpdate) {
        const updatedSection = await SectionsRepository.updateSection(sectionId, filedsToUpdate);
        return updatedSection;
    }
    static async deleteSection(sectionId) {
        const status = await SectionsRepository.deleteSection(sectionId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map