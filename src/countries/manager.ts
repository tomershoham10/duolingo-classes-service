import CountryRepository from "./repository.js";

export default class CountryManager {
  static async createCountry(country: Partial<CountryType>): Promise<CountryType> {
    try {
      const response = await CountryRepository.createCountry(country);
      return response
    } catch (error) {
      throw new Error(`country manager createCountry: ${error}`);
    }
  }

  static async getCountryById(countryId: string): Promise<CountryType | null> {
    try {
      const country = await CountryRepository.getCountryById(countryId);
      console.log("manager getCountryById", country);
      return country;
    } catch (error) {
      throw new Error(`country manager getCountryById: ${error}`);
    }
  }

  static async getAllCountry(): Promise<CountryType[]> {
    try {
      const countries = await CountryRepository.getAllCountry();
      return countries;
    } catch (error) {
      throw new Error(`country manager getAllCountry: ${error}`);
    }
  }

  static async updateCountry(
    countryId: string,
    filedsToUpdate: Partial<CountryType>
  ): Promise<CountryType | null> {
    try {
      const updatedCountry = await CountryRepository.updateCountry(
        countryId,
        filedsToUpdate
      );
      return updatedCountry;
    } catch (error) {
      throw new Error(`country manager updateCountry: ${error}`);
    }
  }

  static async deleteCountry(countryId: string): Promise<CountryType | null> {
    try {
      const status = await CountryRepository.deleteCountry(countryId);
      return status;
    } catch (error) {
      throw new Error(`country manager deleteCountry: ${error}`);
    }
  }
}
