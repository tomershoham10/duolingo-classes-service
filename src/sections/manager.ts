import SectionsRepository from "./repository.js";

export default class SectionsManager {
    static async createSection(
        section: Partial<SectionsType>): Promise<SectionsType> {
        const response = await SectionsRepository.createSection(section);
        return response
    }

    static async getSectionById(sectionId: string): Promise<SectionsType | null> {
        const section = await SectionsRepository.getSectionById(sectionId);
        console.log("sections manager", section);
        return section;
    }

    static async getAllSections(): Promise<SectionsType[] | null> {
        const sections = await SectionsRepository.getAllSections();
        return sections;
    }

    static async updateSection(
        sectionId: string,
        filedsToUpdate: Partial<SectionsType>
    ): Promise<SectionsType | null> {
        const updatedSection = await SectionsRepository.updateSection(
            sectionId,
            filedsToUpdate
        );
        return updatedSection;
    }

    static async deleteSection(sectionId: string): Promise<SectionsType | null> {
        const status = await SectionsRepository.deleteSection(sectionId);
        return status;
    }
}
