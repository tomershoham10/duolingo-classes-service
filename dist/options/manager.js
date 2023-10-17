import OptionRepository from "./repository.js";
export default class OptionManager {
    static async createOption(option) {
        const response = await OptionRepository.createOption(option);
        return response;
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
        const status = await OptionRepository.deleteOption(optionId);
        return status;
    }
}
//# sourceMappingURL=manager.js.map