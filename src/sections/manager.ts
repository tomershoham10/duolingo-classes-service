import SectionsRepository from "./repository.js";

export default class SectionsManager {
    static async createSection(
        section: Partial<SectionsType>): Promise<SectionsType> {
        try {

            const response = await SectionsRepository.createSection(section);
            return response
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }

    static async getSectionById(sectionId: string): Promise<SectionsType | null> {
        try {

            const section = await SectionsRepository.getSectionById(sectionId);
            console.log("sections manager", section);
            return section;
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }

    static async getsLessonsByUnitId(sectionId: string): Promise<LessonsType[] | null | undefined> {
        try {
            const lessons = await SectionsRepository.getsLessonsByUnitId(sectionId);
            console.log("section manager getsSectionsByUnitId", lessons);
            return lessons;
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }

    static async getAllSections(): Promise<SectionsType[] | null> {
        try {

            const sections = await SectionsRepository.getAllSections();
            return sections;
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }

    static async updateSection(
        sectionId: string,
        filedsToUpdate: Partial<SectionsType>
    ): Promise<SectionsType | null> {
        try {
            const updatedSection = await SectionsRepository.updateSection(
                sectionId,
                filedsToUpdate
            );
            return updatedSection;
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }

    static async deleteSection(sectionId: string): Promise<SectionsType | null> {
        try {
            const status = await SectionsRepository.deleteSection(sectionId);
            return status;
        }
        catch (err) {
            throw new Error(`Error manager getsSectionsByUnitId: ${err}`);
        }
    }
}  