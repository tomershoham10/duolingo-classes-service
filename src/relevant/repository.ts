import RelevantModel from './model.js';

export default class RelevantRepository {
  static async createRelevant(
    relevant: Partial<RelevantType>
  ): Promise<RelevantType | null> {
    try {
      const existingRelevant = await RelevantModel.findOne({
        relevant_name: relevant.relevant_name,
      });
      if (existingRelevant) {
        return null;
      }

      console.log('repo - createRelevant', relevant);

      const newRelevant = await RelevantModel.create(relevant);
      return newRelevant;
    } catch (error) {
      throw new Error(`Relevant repo createRelevant: ${error}`);
    }
  }

  static async getRelevantById(
    relevantId: string
  ): Promise<RelevantType | null> {
    try {
      const relevant = await RelevantModel.findById(relevantId);
      console.log('repo', relevant);
      return relevant;
    } catch (error) {
      throw new Error(`relevant repo getRelevantById: ${error}`);
    }
  }

  static async getAllLists(): Promise<RelevantType[]> {
    try {
      const lists = await RelevantModel.find({});
      return lists;
    } catch (error) {
      throw new Error(`relevant repo getAllLists: ${error}`);
    }
  }

  static async updateRelevant(
    relevantId: string,
    fieldsToUpdate: Partial<RelevantType>
  ): Promise<RelevantType | null> {
    try {
      const updatedRelevant = await RelevantModel.findByIdAndUpdate(
        relevantId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedRelevant;
    } catch (error) {
      throw new Error(`relevant repo updateRelevant: ${error}`);
    }
  }

  static async deleteRelevant(
    relevantId: string
  ): Promise<RelevantType | null> {
    try {
      const status = await RelevantModel.findOneAndDelete({ _id: relevantId });
      return status;
    } catch (error) {
      throw new Error(`relevant repo deleteRelevant: ${error}`);
    }
  }
}
