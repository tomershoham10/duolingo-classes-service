import { OptionModel } from "./model.js";
export default class OptionRepository {
    static async createOption(option) {
        const newOption = await OptionModel.create(option);
        return newOption;
    }
    static async getOptionById(optionId) {
        const option = await OptionModel.findById(optionId);
        console.log("repo", option);
        return option;
    }
    static async getAllOption() {
        const options = await OptionModel.find({});
        return options;
    }
    static async updateOption(optionId, filedsToUpdate) {
        const updatedOption = await OptionModel.findByIdAndUpdate(optionId, filedsToUpdate, { new: true });
        return updatedOption;
    }
    static async deleteOption(optionId) {
        const option = await OptionModel.findOneAndDelete({ _id: optionId });
        return option;
    }
}
//# sourceMappingURL=repository.js.map