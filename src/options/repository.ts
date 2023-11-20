import OptionModel from "./model.js";

export default class OptionRepository {
  static async createOption(option: Partial<OptionType>): Promise<OptionType> {
    try {
      const existingOption = await OptionModel.findOne({ name: option.name });
      if (existingOption) {
        throw new Error("Option already exists");
      }

      const newOption = await OptionModel.create(option);
      return newOption;
    } catch (error) {
      throw new Error(`options repo createOption: ${error}`);
    }
  }

  static async getOptionById(optionId: string): Promise<OptionType | null> {
    try {

      const option = await OptionModel.findById(optionId);
      console.log("repo", option);
      return option;
    } catch (error) {
      throw new Error(`options repo getOptionById: ${error}`);

    }
  }

  static async getAllOption(): Promise<OptionType[]> {
    try {
      const options = await OptionModel.find({});
      return options;
    } catch (error) {
      throw new Error(`options repo getAllOption: ${error}`);

    }
  }

  static async updateOption(
    optionId: string,
    fieldsToUpdate: Partial<OptionType>
  ): Promise<OptionType | null> {
    try {
      const updatedOption = await OptionModel.findByIdAndUpdate(
        optionId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedOption;
    } catch (error) {
      throw new Error(`options repo updateOption: ${error}`);
    }
  }

  static async deleteOption(optionId: string): Promise<OptionType | null> {
    try {
      const status = await OptionModel.findOneAndDelete({ _id: optionId });
      return status;
    }
    catch (error) {
      throw new Error(`options repo deleteOption: ${error}`);
    }
  }
}
