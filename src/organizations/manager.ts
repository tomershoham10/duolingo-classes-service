import {
  getFromCache,
  resetNamespaceCache,
  setToCache,
} from '../utils/cache.js';
import OrganizationRepository from './repository.js';

export default class OrganizationManager {
  static async createOrganization(
    organization: Partial<OrganizationType>
  ): Promise<OrganizationType> {
    try {
      const newOrganization =
        await OrganizationRepository.createOrganization(organization);
      await setToCache(
        'organizations',
        newOrganization._id,
        JSON.stringify(newOrganization),
        36000
      );
      await resetNamespaceCache('getAllOrganizations', 'allOrganizations');
      return newOrganization;
    } catch (error) {
      throw new Error(`organization manager createOrganization: ${error}`);
    }
  }

  static async getOrganizationById(
    organizationId: string
  ): Promise<OrganizationType | null> {
    try {
      const cachedOrganization = await getFromCache(
        'organizations',
        organizationId
      );
      if (cachedOrganization) {
        console.log(
          'Cache hit: organizations manager - getOrganizationById',
          organizationId
        );
        return JSON.parse(cachedOrganization); // Parse cached JSON data
      }

      const organization =
        await OrganizationRepository.getOrganizationById(organizationId);
      organization !== null &&
        (await setToCache(
          'organizations',
          organizationId,
          JSON.stringify(organization),
          36000
        ));

      console.log('manager getOrganizationById', organization);
      return organization;
    } catch (error) {
      throw new Error(`organization manager getOrganizationById: ${error}`);
    }
  }

  static async getAllOrganizations(): Promise<OrganizationType[]> {
    try {
      const cachedOrganizations = await getFromCache(
        'getAllOrganizations',
        'allOrganizations'
      );
      if (cachedOrganizations) {
        console.log(
          'Cache hit: organizations manager - getAllOrganizations',
          cachedOrganizations
        );
        return JSON.parse(cachedOrganizations);
      }
      const organizations = await OrganizationRepository.getAllOrganizations();
      await setToCache(
        'getAllOrganizations',
        'allOrganizations',
        JSON.stringify(organizations),
        36000
      );
      return organizations;
    } catch (error) {
      throw new Error(`organization manager getAllOrganizations: ${error}`);
    }
  }

  static async updateOrganization(
    organizationId: string,
    filedsToUpdate: Partial<OrganizationType>
  ): Promise<OrganizationType | null> {
    try {
      const updatedOrganization =
        await OrganizationRepository.updateOrganization(
          organizationId,
          filedsToUpdate
        );
      await setToCache(
        'organizations',
        organizationId,
        JSON.stringify(updatedOrganization),
        3600
      );
      await resetNamespaceCache('getAllOrganizations', 'allOrganizations');
      return updatedOrganization;
    } catch (error) {
      throw new Error(`organization manager updateOrganization: ${error}`);
    }
  }

  static async deleteOrganization(
    organizationId: string
  ): Promise<OrganizationType | null> {
    try {
      const status = await OrganizationRepository.deleteOrganization(organizationId);
      status ? await resetNamespaceCache('counries', organizationId) : null;
      await resetNamespaceCache('getAllOrganizations', 'allOrganizations');
      return status;
    } catch (error) {
      throw new Error(`organization manager deleteOrganization: ${error}`);
    }
  }
}
