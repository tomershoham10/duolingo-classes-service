import OptionModel from "./model.js";
export default class OptionRepository {
    static async createOption(option) {
        try {
            const existingOption = await OptionModel.findOne({ name: option.name });
            if (existingOption) {
                throw new Error("Option already exists");
            }
            const newOption = await OptionModel.create(option);
            return newOption;
        }
        catch (error) {
            throw new Error(`options repo createOption: ${error}`);
        }
    }
    static async getOptionById(optionId) {
        try {
            const option = await OptionModel.findById(optionId);
            console.log("repo", option);
            return option;
        }
        catch (error) {
            throw new Error(`options repo getOptionById: ${error}`);
        }
    }
    static async getAllOption() {
        try {
            const options = await OptionModel.find({});
            return options;
        }
        catch (error) {
            throw new Error(`options repo getAllOption: ${error}`);
        }
    }
    static async updateOption(optionId, fieldsToUpdate) {
        try {
            const updatedOption = await OptionModel.findByIdAndUpdate(optionId, fieldsToUpdate, { new: true });
            return updatedOption;
        }
        catch (error) {
            throw new Error(`options repo updateOption: ${error}`);
        }
    }
    static async deleteOption(optionId) {
        try {
            const status = await OptionModel.findOneAndDelete({ _id: optionId });
            return status;
        }
        catch (error) {
            throw new Error(`options repo deleteOption: ${error}`);
        }
    }
}
//# sourceMappingURL=repository.js.map