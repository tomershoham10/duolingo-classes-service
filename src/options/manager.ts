import OptionRepository from "./repository.js";

export default class OptionManager {
  static async createOption(name: string, type: OTypes): Promise<OptionType> {
    const newOption: OptionType = {
      name,
      type,
    };

    const response = await OptionRepository.createOption(newOption);
    return response
  }

  static async getOptionById(optionId: string): Promise<OptionType | null> {
    const option = await OptionRepository.getOptionById(optionId);
    console.log("manager", option);
    return option;
  }

  static async getAllOption(): Promise<OptionType[]> {
    const options = await OptionRepository.getAllOption();
    return options;
  }

  static async updateOption(
    optionId: string,
    filedsToUpdate: Partial<OptionType>
  ): Promise<OptionType | null> {
    const updatedOption = await OptionRepository.updateOption(
      optionId,
      filedsToUpdate
    );
    return updatedOption;
  }

  static async deleteOption(optionId: string): Promise<OptionType | null> {
    const status = await OptionRepository.deleteOption(optionId);
    return status;
  }
}
