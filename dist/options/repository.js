import OptionModel from "./model.js";
export default class OptionRepository {
    static async createOption(option) {
        const existingOption = await OptionModel.findOne({ name: option.name });
        if (existingOption) {
            throw new Error("Option already exists");
        }
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
    static async updateOption(optionId, fieldsToUpdate) {
        const updatedOption = await OptionModel.findByIdAndUpdate(optionId, fieldsToUpdate, { new: true });
        return updatedOption;
    }
    static async deleteOption(optionId) {
        const status = await OptionModel.findOneAndDelete({ _id: optionId });
        return status;
    }
}
//# sourceMappingURL=repository.js.map