import CountryModel from './model.js';

export default class CountryRepository {
  static async createCountry(
    country: Partial<CountryType>
  ): Promise<CountryType> {
    try {
      console.log('createCountry repo - country req: ', country);
      const newCountry = await CountryModel.create(country);
      console.log('createCountry repo - newCountry: ', newCountry);
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
      throw new Error(`countries repo getCountryById: ${error}`);
    }
  }

  static async getAllCountries(): Promise<CountryType[]> {
    try {
      const countries = await CountryModel.find({});
      return countries;
    } catch (error) {
      throw new Error(`countries repo getAllCountries: ${error}`);
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
      throw new Error(`countries repo updateCountry: ${error}`);
    }
  }

  static async deleteCountry(countryId: string): Promise<CountryType | null> {
    try {
      const status = await CountryModel.findOneAndDelete({ _id: countryId });
      return status;
    } catch (error) {
      throw new Error(`countries repo deleteCountry: ${error}`);
    }
  }
}
