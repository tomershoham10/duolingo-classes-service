import CountryManager from "./manager.js";
import CountryModel from "./model.js";
export default class CountryController {
    static async create(req, res, next) {
        try {
            const { name } = req.body;
            const reqCountry = { name: name };
            const isExisted = await CountryModel.findOne({ name: name });
            if (isExisted) {
                console.error('country already existed');
                return res.status(403).json({ error: 'country already existed' });
            }
            console.log("CountryController create - reqCountry", reqCountry);
            const newCountry = await CountryManager.createCountry(reqCountry);
            res
                .status(201)
                .json({ message: "Country registered successfully", newCountry });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    } // cached
    static async getById(req, res, next) {
        try {
            const countryId = req.params.id;
            console.log("controller", countryId);
            const country = await CountryManager.getCountryById(countryId);
            if (!country) {
                return res.status(404).json({ message: "Country not found" });
            }
            res.status(200).json({ country });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    } // cached
    static async getMany(_req, res, next) {
        try {
            console.log("country controller getAll");
            const countries = await CountryManager.getAllCountry();
            console.log(countries);
            res.status(200).json({ countries });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    } // cached
    static async update(req, res, next) {
        try {
            const countryId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedCountry = await CountryManager.updateCountry(countryId, fieldsToUpdate);
            if (!updatedCountry) {
                return res.status(404).json({ message: "Country not found" });
            }
            res.status(200).json({ updatedCountry });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const countryId = req.params.id;
            const deletedCountry = await CountryManager.deleteCountry(countryId);
            if (!deletedCountry) {
                return res.status(404).json({ message: "Country not found" });
            }
            res.status(200).json({ deletedCountry });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map