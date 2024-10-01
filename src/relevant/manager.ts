import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import RelevantRepository from './repository.js';

export default class RelevantManager {
  static async createRelevant(
    relevant: Partial<RelevantType>
  ): Promise<RelevantType | null> {
    try {
      const response = await RelevantRepository.createRelevant(relevant);
      if (response === null) return null;
      await setToCache(
        'relevant',
        response._id,
        JSON.stringify(response),
        36000
      );
      await resetNamespaceCache('getAllLists', 'allLists');

      return response;
    } catch (error) {
      throw new Error(`relevant manager createRelevant: ${error}`);
    }
  }

  static async getRelevantById(relevantId: string): Promise<RelevantType | null> {
    try {
      const cachedRelevant = await getFromCache('relevant', relevantId);
      if (cachedRelevant) {
        console.log('Cache hit: relevant manager - getRelevantById', relevantId);
        return JSON.parse(cachedRelevant); // Parse cached JSON data
      }
      const relevant = await RelevantRepository.getRelevantById(relevantId);
      relevant !== null
        ? await setToCache('relevant', relevantId, JSON.stringify(relevant), 3600)
        : null;

      console.log('manager', relevant);
      return relevant;
    } catch (error) {
      throw new Error(`relevant manager getRelevantById: ${error}`);
    }
  }

  static async getAllLists(): Promise<RelevantType[]> {
    try {
      const cachedLists = await getFromCache('getAllLists', 'allLists');
      if (cachedLists) {
        console.log('Cache hit: relevant manager - getAllLists', cachedLists);
        return JSON.parse(cachedLists); // Parse cached JSON data
      }
      const relevant = await RelevantRepository.getAllLists();
      await setToCache(
        'getAllLists',
        'allLists',
        JSON.stringify(relevant),
        3600
      );

      return relevant;
    } catch (error) {
      throw new Error(`relevant manager getAllLists: ${error}`);
    }
  }

  static async updateRelevant(
    relevantId: string,
    filedsToUpdate: Partial<RelevantType>
  ): Promise<RelevantType | null> {
    try {
      const updatedRelevant = await RelevantRepository.updateRelevant(
        relevantId,
        filedsToUpdate
      );
      await setToCache(
        'relevant',
        relevantId,
        JSON.stringify(updatedRelevant),
        3600
      );
      await resetNamespaceCache('getAllLists', 'allLists');

      return updatedRelevant;
    } catch (error) {
      throw new Error(`relevant manager updateRelevant: ${error}`);
    }
  }

  static async deleteRelevant(relevantId: string): Promise<RelevantType | null> {
    try {
      const status = await RelevantRepository.deleteRelevant(relevantId);
      status ? await resetNamespaceCache('relevant', relevantId) : null;
      await resetNamespaceCache('getAllLists', 'allLists');

      return status;
    } catch (error) {
      throw new Error(`relevant manager deleteRelevant: ${error}`);
    }
  }
}
