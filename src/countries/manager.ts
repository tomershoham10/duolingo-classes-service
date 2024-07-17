import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import CountryRepository from './repository.js';

export default class CountryManager {
  static async createCountry(
    country: Partial<CountryType>
  ): Promise<CountryType> {
    try {
      const newCountry = await CountryRepository.createCountry(country);
      await setToCache(
        'countries',
        newCountry._id,
        JSON.stringify(newCountry),
        36000
      );
      await resetNamespaceCache('getAllCountries', 'allCountries');
      return newCountry;
    } catch (error) {
      throw new Error(`country manager createCountry: ${error}`);
    }
  }

  static async getCountryById(countryId: string): Promise<CountryType | null> {
    try {
      const cachedCountry = await getFromCache('countries', countryId);
      if (cachedCountry) {
        console.log('Cache hit: countries manager - getCountryById', countryId);
        return JSON.parse(cachedCountry); // Parse cached JSON data
      }

      const country = await CountryRepository.getCountryById(countryId);
      country !== null
        ? await setToCache(
            'countries',
            countryId,
            JSON.stringify(country),
            36000
          )
        : null;

      console.log('manager getCountryById', country);
      return country;
    } catch (error) {
      throw new Error(`country manager getCountryById: ${error}`);
    }
  }

  static async getAllCountry(): Promise<CountryType[]> {
    try {
      const cachedCountries = await getFromCache(
        'getAllCountries',
        'allCountries'
      );
      if (cachedCountries) {
        console.log(
          'Cache hit: countries manager - getAllCountry',
          cachedCountries
        );
        return JSON.parse(cachedCountries);
      }
      const countries = await CountryRepository.getAllCountry();
      await setToCache(
        'getAllCountries',
        'allCountries',
        JSON.stringify(countries),
        36000
      );
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
      await setToCache(
        'countries',
        countryId,
        JSON.stringify(updatedCountry),
        3600
      );
      await resetNamespaceCache('getAllCountries', 'allCountries');
      return updatedCountry;
    } catch (error) {
      throw new Error(`country manager updateCountry: ${error}`);
    }
  }

  static async deleteCountry(countryId: string): Promise<CountryType | null> {
    try {
      const status = await CountryRepository.deleteCountry(countryId);
      status ? await resetNamespaceCache('counries', countryId) : null;
      await resetNamespaceCache('getAllCountries', 'allCountries');
      return status;
    } catch (error) {
      throw new Error(`country manager deleteCountry: ${error}`);
    }
  }
}
