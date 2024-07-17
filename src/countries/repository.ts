import CountryModel from './model.js';

export default class CountryRepository {
  static async createCountry(
    country: Partial<CountryType>
  ): Promise<CountryType> {
    try {
      const existingCountry = await CountryModel.findOne({
        name: country.name,
      });
      if (existingCountry) {
        throw new Error('Country already exists');
      }

      const newCountry = await CountryModel.create(country);
      return newCountry;
    } catch (error) {
      throw new Error(`countries repo createCountry: ${error}`);
    }
  }

  static async getCountryById(countryId: string): Promise<CountryType | null> {
    try {
      const country = await CountryModel.findById(countryId);
      console.log('repo', country);
      return country;
    } catch (error) {
      throw new Error(`countries repo createCountry: ${error}`);
    }
  }

  static async getAllCountry(): Promise<CountryType[]> {
    try {
      const countries = await CountryModel.find({});
      return countries;
    } catch (error) {
      throw new Error(`countries repo createCountry: ${error}`);
    }
  }

  static async updateCountry(
    countryId: string,
    fieldsToUpdate: Partial<CountryType>
  ): Promise<CountryType | null> {
    try {
      const updatedCountry = await CountryModel.findByIdAndUpdate(
        countryId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedCountry;
    } catch (error) {
      throw new Error(`countries repo createCountry: ${error}`);
    }
  }

  static async deleteCountry(countryId: string): Promise<CountryType | null> {
    try {
      const status = await CountryModel.findOneAndDelete({ _id: countryId });
      return status;
    } catch (error) {
      throw new Error(`countries repo createCountry: ${error}`);
    }
  }
}
