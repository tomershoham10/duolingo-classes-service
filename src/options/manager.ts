import { OptionModel, OptionType, Types } from "./model.js";
import OptionRepository from "./repository.js";

export default class OptionManager {
  static async createOption(name: string, type: Types): Promise<OptionType> {
    const existingUser = await OptionModel.findOne({ name });
    if (existingUser) {
      throw new Error("Option already exists");
    }

    const newUser: OptionType = {
      name,
      type,
    };

    return OptionRepository.createOption(newUser);
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
    const option = await OptionRepository.deleteOption(optionId);
    return option;
  }
}
