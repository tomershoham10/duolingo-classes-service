import OptionRepository from "./repository.js";

export default class OptionManager {
  static async createOption(option: Partial<OptionType>): Promise<OptionType> {
    try {
      const response = await OptionRepository.createOption(option);
      return response
    } catch (error) {
      throw new Error(`options manager createOption: ${error}`);
    }
  }

  static async getOptionById(optionId: string): Promise<OptionType | null> {
    try {
      const option = await OptionRepository.getOptionById(optionId);
      console.log("manager", option);
      return option;
    } catch (error) {
      throw new Error(`options manager getOptionById: ${error}`);
    }
  }

  static async getAllOption(): Promise<OptionType[]> {
    try {
      const options = await OptionRepository.getAllOption();
      return options;
    } catch (error) {
      throw new Error(`options manager getAllOption: ${error}`);
    }
  }

  static async updateOption(
    optionId: string,
    filedsToUpdate: Partial<OptionType>
  ): Promise<OptionType | null> {
    try {
      const updatedOption = await OptionRepository.updateOption(
        optionId,
        filedsToUpdate
      );
      return updatedOption;
    } catch (error) {
      throw new Error(`options manager updateOption: ${error}`);
    }
  }

  static async deleteOption(optionId: string): Promise<OptionType | null> {
    try {
      const status = await OptionRepository.deleteOption(optionId);
      return status;
    } catch (error) {
      throw new Error(`options manager deleteOption: ${error}`);
    }
  }
}
