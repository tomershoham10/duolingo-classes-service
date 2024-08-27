import { Request, Response, NextFunction } from 'express';
import OrganizationManager from './manager.js';
// import OrganizationModel from './model.js';

export default class OrganizationController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reqOrganization = req.body as Partial<OrganizationType>;
      console.log(
        'OrganizationController create - reqOrganization',
        reqOrganization
      );
      const newOrganization =
        await OrganizationManager.createOrganization(reqOrganization);
      res
        .status(201)
        .json({
          message: 'Organization registered successfully',
          newOrganization,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  } // cached

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId: string = req.params.id;
      console.log('controller', organizationId);
      const organization = await OrganizationManager.getOrganizationById(organizationId);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      res.status(200).json({ organization });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  } // cached

  static async getMany(_req: Request, res: Response, next: NextFunction) {
    try {
      console.log('organization controller getAll');
      const organizations = await OrganizationManager.getAllOrganizations();
      console.log(organizations);
      res.status(200).json({ organizations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  } // cached

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId: string = req.params.id;
      const fieldsToUpdate: Partial<OrganizationType> = req.body;

      const updatedOrganization = await OrganizationManager.updateOrganization(
        organizationId,
        fieldsToUpdate
      );

      if (!updatedOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      res.status(200).json({ updatedOrganization });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId: string = req.params.id;
      const deletedOrganization = await OrganizationManager.deleteOrganization(organizationId);

      if (!deletedOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      res.status(200).json({ deletedOrganization });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Internal Server Error' });
      next(error);
    }
  }
}
