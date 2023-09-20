import { OptionModel, OptionType } from "./model.js";

export default class OptionRepository {
  static async createOption(option: OptionType): Promise<OptionType> {
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
    filedsToUpdate: Partial<OptionType>
  ): Promise<OptionType | null> {
    const updatedOption = await OptionModel.findByIdAndUpdate(
      optionId,
      filedsToUpdate,
      { new: true }
    );
    return updatedOption;
  }

  static async deleteOption(optionId: string): Promise<OptionType | null> {
    const option = await OptionModel.findOneAndDelete({ _id: optionId });
    return option;
  }
}
