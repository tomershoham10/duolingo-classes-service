import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import TargetRepository from './repository.js';

export default class TargetManager {
  static async createTarget(target: Partial<TargetType>): Promise<TargetType> {
    try {
      const response = await TargetRepository.createTarget(target);
      await setToCache(
        'targets',
        response._id,
        JSON.stringify(response),
        36000
      );
      await resetNamespaceCache('getAllTarget', 'allTarget');

      return response;
    } catch (error) {
      throw new Error(`targets manager createTarget: ${error}`);
    }
  }

  static async getTargetById(targetId: string): Promise<TargetType | null> {
    try {
      const cachedTarget = await getFromCache('targets', targetId);
      if (cachedTarget) {
        console.log('Cache hit: targets manager - getTargetById', targetId);
        return JSON.parse(cachedTarget); // Parse cached JSON data
      }
      const target = await TargetRepository.getTargetById(targetId);
      target !== null
        ? await setToCache('targets', targetId, JSON.stringify(target), 3600)
        : null;

      console.log('manager', target);
      return target;
    } catch (error) {
      throw new Error(`targets manager getTargetById: ${error}`);
    }
  }

  static async getAllTarget(): Promise<TargetType[]> {
    try {
      const cachedTargets = await getFromCache('getAllTarget', 'allTarget');
      if (cachedTargets) {
        console.log('Cache hit: targets manager - getAllTarget', cachedTargets);
        return JSON.parse(cachedTargets); // Parse cached JSON data
      }
      const targets = await TargetRepository.getAllTarget();
      await setToCache(
        'getAllTarget',
        'allTarget',
        JSON.stringify(targets),
        3600
      );

      return targets;
    } catch (error) {
      throw new Error(`targets manager getAllTarget: ${error}`);
    }
  }

  static async updateTarget(
    targetId: string,
    filedsToUpdate: Partial<TargetType>
  ): Promise<TargetType | null> {
    try {
      const updatedTarget = await TargetRepository.updateTarget(
        targetId,
        filedsToUpdate
      );
      await setToCache(
        'targets',
        targetId,
        JSON.stringify(updatedTarget),
        3600
      );
      await resetNamespaceCache('getAllTarget', 'allTarget');

      return updatedTarget;
    } catch (error) {
      throw new Error(`targets manager updateTarget: ${error}`);
    }
  }

  static async deleteTarget(targetId: string): Promise<TargetType | null> {
    try {
      const status = await TargetRepository.deleteTarget(targetId);
      status ? await resetNamespaceCache('targets', targetId) : null;
      await resetNamespaceCache('getAllTarget', 'allTarget');

      return status;
    } catch (error) {
      throw new Error(`targets manager deleteTarget: ${error}`);
    }
  }
}
