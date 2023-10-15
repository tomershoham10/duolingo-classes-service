import SectionsModel from "./model.js";

export default class SectionsRepository {
    static async createSection(section: SectionsType): Promise<SectionsType> {
        const newSection = await SectionsModel.create(section);
        return newSection;
    }

    static async getSectionById(sectionId: string): Promise<SectionsType | null> {
        const section = await SectionsModel.findById(sectionId);
        console.log("sections repo", sectionId);
        return section;
    }

    static async getAllSections(): Promise<SectionsType[] | null> {
        const sections = await SectionsModel.find({});
        return sections;
    }

    static async updateSection(
        sectionId: string,
        fieldsToUpdate: Partial<SectionsType>
    ): Promise<SectionsType | null> {
        const updatedSection = await SectionsModel.findByIdAndUpdate(
            sectionId,
            fieldsToUpdate,
            { new: true }
        );
        return updatedSection;
    }

    static async deleteSection(sectionId: string): Promise<SectionsType | null> {
        const status = await SectionsModel.findOneAndDelete({ _id: sectionId });
        return status;
    }
}
