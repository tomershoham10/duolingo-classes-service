import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import ResultsRepository from './repository.js';

export default class ResultsManager {
  static async createResult(result: Partial<ResultType>): Promise<ResultType> {
    try {
      const response = await ResultsRepository.createResult(result);
      await setToCache('results', response._id, JSON.stringify(response), 3600);
      await resetNamespaceCache('getAllResults', 'allResults');

      return response;
    } catch (error) {
      throw new Error(`Results repo create: ${error}`);
    }
  }

  static async getResultById(resultId: string): Promise<ResultType | null> {
    try {
      const cachedResult = await getFromCache('results', resultId);
      if (cachedResult) {
        console.log('Cache hit: results manager - getResultById', resultId);
        return JSON.parse(cachedResult); // Parse cached JSON data
      }
      const result = await ResultsRepository.getResultById(resultId);
      result !== null
        ? await setToCache('results', resultId, JSON.stringify(result), 3600)
        : null;

      console.log('results manager getResultById', result);
      return result;
    } catch (error) {
      throw new Error(`Results repo getResultById: ${error}`);
    }
  }

  static async getResultsByUserId(
    userId: string
  ): Promise<ResultType[] | null> {
    try {
      const cachedResults = await getFromCache('getResultsByUserId', userId);
      if (cachedResults) {
        console.log('Cache hit: results manager - getResultsByUserId', userId);
        return JSON.parse(cachedResults); // Parse cached JSON data
      }
      const results = await ResultsRepository.getResultsByUserId(userId);
      await setToCache(
        'getResultsByUserId',
        userId,
        JSON.stringify(results),
        3600
      );
      console.log('results manager getResultsByUserId', results);
      return results;
    } catch (error) {
      throw new Error(`Results repo getResultsByUserId: ${error}`);
    }
  }

  static async getResultsByLessonAndUser(
    lessonId: string,
    userId: string
  ): Promise<ResultType[] | null> {
    try {
      const cachedResults = await getFromCache(
        'getResultsByLessonAndUser',
        lessonId + userId
      );
      if (cachedResults) {
        console.log(
          'Cache hit: results manager - getResultsByLessonAndUser',
          lessonId,
          userId
        );
        return JSON.parse(cachedResults); // Parse cached JSON data
      }
      const results = await ResultsRepository.getResultsByLessonAndUser(
        lessonId,
        userId
      );
      await setToCache(
        'getResultsByLessonAndUser',
        lessonId + userId,
        JSON.stringify(results),
        3600
      );
      console.log('results manager getResultsByLessonAndUser', results);
      return results;
    } catch (error) {
      throw new Error(`Results repo getResultsByLessonAndUser: ${error}`);
    }
  }

  static async getAllResults(): Promise<ResultType[]> {
    try {
      const cachedResults = await getFromCache('getAllResults', 'allResults');
      if (cachedResults) {
        console.log(
          'Cache hit: results manager - getAllResults',
          cachedResults
        );
        return JSON.parse(cachedResults); // Parse cached JSON data
      }

      const results = await ResultsRepository.getAllResults();
      await setToCache(
        'getAllResults',
        'allResults',
        JSON.stringify(results),
        3600
      );

      return results;
    } catch (error) {
      throw new Error(`Results repo getAllResults: ${error}`);
    }
  }

  static async updateResult(
    resultId: string,
    filedsToUpdate: Partial<ResultType>
  ): Promise<ResultType | null> {
    try {
      const updatedResult = await ResultsRepository.updateResult(
        resultId,
        filedsToUpdate
      );
      await setToCache(
        'results',
        resultId,
        JSON.stringify(updatedResult),
        3600
      );
      await resetNamespaceCache('getAllResults', 'allResults');

      return updatedResult;
    } catch (error) {
      throw new Error(`Results repo updateResult: ${error}`);
    }
  }

  static async deleteResult(resultId: string): Promise<ResultType | null> {
    try {
      const status = await ResultsRepository.deleteResult(resultId);
      status ? await resetNamespaceCache('results', 'resultId') : null;
      await resetNamespaceCache('getAllResults', 'allResults');

      return status;
    } catch (error) {
      throw new Error(`Results repo deleteResult: ${error}`);
    }
  }
}
