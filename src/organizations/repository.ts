import OrganizationModel from './model.js';

export default class OrganizationRepository {
  static async createOrganization(
    Organization: Partial<OrganizationType>
  ): Promise<OrganizationType> {
    try {
      const existingOrganization = await OrganizationModel.findOne({
        organization_name: Organization.organization_name,
      });
      if (existingOrganization) {
        throw new Error('Organization already exists');
      }

      const newOrganization = await OrganizationModel.create(Organization);
      return newOrganization;
    } catch (error) {
      throw new Error(`Organizations repo createOrganization: ${error}`);
    }
  }

  static async getOrganizationById(
    OrganizationId: string
  ): Promise<OrganizationType | null> {
    try {
      const Organization = await OrganizationModel.findById(OrganizationId);
      console.log('repo', Organization);
      return Organization;
    } catch (error) {
      throw new Error(`Organizations repo createOrganization: ${error}`);
    }
  }

  static async getAllOrganizations(): Promise<OrganizationType[]> {
    try {
      const Organizations = await OrganizationModel.find({});
      return Organizations;
    } catch (error) {
      throw new Error(`Organizations repo createOrganization: ${error}`);
    }
  }

  static async updateOrganization(
    OrganizationId: string,
    fieldsToUpdate: Partial<OrganizationType>
  ): Promise<OrganizationType | null> {
    try {
      const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
        OrganizationId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedOrganization;
    } catch (error) {
      throw new Error(`Organizations repo createOrganization: ${error}`);
    }
  }

  static async deleteOrganization(
    OrganizationId: string
  ): Promise<OrganizationType | null> {
    try {
      const status = await OrganizationModel.findOneAndDelete({
        _id: OrganizationId,
      });
      return status;
    } catch (error) {
      throw new Error(`Organizations repo createOrganization: ${error}`);
    }
  }
}
