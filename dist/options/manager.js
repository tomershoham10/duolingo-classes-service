import { OptionModel } from "./model.js";
import OptionRepository from "./repository.js";
export default class OptionManager {
    static async createOption(name, type) {
        const existingUser = await OptionModel.findOne({ name });
        if (existingUser) {
            throw new Error("Option already exists");
        }
        const newUser = {
            name,
            type,
        };
        return OptionRepository.createOption(newUser);
    }
    static async getOptionById(optionId) {
        const option = await OptionRepository.getOptionById(optionId);
        console.log("manager", option);
        return option;
    }
    static async getAllOption() {
        const options = await OptionRepository.getAllOption();
        return options;
    }
    static async updateOption(optionId, filedsToUpdate) {
        const updatedOption = await OptionRepository.updateOption(optionId, filedsToUpdate);
        return updatedOption;
    }
    static async deleteOption(optionId) {
        const option = await OptionRepository.deleteOption(optionId);
        return option;
    }
}
//# sourceMappingURL=manager.js.map