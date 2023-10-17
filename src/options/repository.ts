import OptionModel from "./model.js";

export default class OptionRepository {
  static async createOption(option: Partial<OptionType>): Promise<OptionType> {
    const existingOption = await OptionModel.findOne({ name: option.name });
    if (existingOption) {
      throw new Error("Option already exists");
    }

    const newOption = await OptionModel.create(option);
    return newOption;
  }

  static async getOptionById(optionId: string): Promise<OptionType | null> {
    const option = await OptionModel.findById(optionId);
    console.log("repo", option);
    return option;
  }

  static async getAllOption(): Promise<OptionType[]> {
    const options = await OptionModel.find({});
    return options;
  }

  static async updateOption(
    optionId: string,
    fieldsToUpdate: Partial<OptionType>
  ): Promise<OptionType | null> {
    const updatedOption = await OptionModel.findByIdAndUpdate(
      optionId,
      fieldsToUpdate,
      { new: true }
    );
    return updatedOption;
  }

  static async deleteOption(optionId: string): Promise<OptionType | null> {
    const status = await OptionModel.findOneAndDelete({ _id: optionId });
    return status;
  }
}
