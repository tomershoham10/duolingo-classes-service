// import { Request, Response } from 'express';
// import UnitsManager from './manager.js';
// import mongoose from 'mongoose';
// // import UnitsModel from './model.js';
// import CoursesModel from '../courses/model.js';
// // import CoursesRepository from "../courses/repository.js";

// export default class UnitsController {
//   static async create(req: Request, res: Response) {
//     try {
//       const { guidebookId, description } = req.body as {
//         guidebookId?: string;
//         description?: string;
//       };

//       const reqUnit: Partial<UnitsType> = Object.create({});

//       if (guidebookId) {
//         reqUnit.guidebookId = guidebookId;
//       }

//       if (description) {
//         reqUnit.description = description;
//       }

//       const newUnit = await UnitsManager.createUnit(reqUnit);
//       if (newUnit) {
//         return res
//           .status(201)
//           .json({ message: 'unit created successfully', newUnit });
//       } else {
//         throw new Error('unit controller create error.');
//       }
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(400).json({ error: error.message });
//     }
//   } // cached

//   static async createByCourse(req: Request, res: Response) {
//     const { unitData, courseId } = req.body as {
//       unitData: Partial<UnitsType>;
//       courseId: string;
//     };
//     try {
//       const session = await mongoose.startSession();
//       session.startTransaction();

//       console.log('controller - createByCourse', courseId, unitData);
//       const course = await CoursesModel.findById(courseId);
//       console.log(course);
//       if (!course) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(404).json({ message: 'Course not found' });
//       }

//       const newUnit = await UnitsManager.createUnit(Object.create({}));

//       course.unitsIds
//         ? course.unitsIds.push(newUnit._id.toString())
//         : (course.unitsIds = [newUnit._id.toString()]);
//       // const updatedCourse = await CoursesRepository.updateCourse(course._id, { units: course.units })
//       // await newUnit.save({ session: session });
//       await course.save({ session: session });
//       await session.commitTransaction();
//       session.endSession();
//       res
//         .status(201)
//         .json({ message: 'New unit created and course updated successfully' });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(400).json({ error: error.message });
//     }
//   }

//   static async getById(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       console.log('units controller', unitId);
//       const unit = await UnitsManager.getUnitById(unitId);
//       if (!unit) {
//         return res.status(404).json({ message: 'unit not found' });
//       }

//       res.status(200).json({ unit });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // cached

//   static async getLevelsById(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       console.log('units controller: getLevelsById', unitId);
//       const levels = await UnitsManager.getsLevelsByUnitId(unitId);
//       if (!levels) {
//         return res.status(404).json({ message: 'units not found' });
//       }

//       res.status(200).json({ levels });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // cached - *need to reset the cache if levels data changed!*

//   static async getUnsuspendedLevelsById(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       console.log('units controller: getUnsuspendedLevelsById', unitId);
//       const levels = await UnitsManager.getUnsuspendedLevelsByUnitId(unitId);
//       if (!levels) {
//         return res.status(404).json({ message: 'units not found' });
//       }

//       res.status(200).json({ levels });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // cached - *need to reset the cache if levels data changed!*

//   static async getNextLevelId(req: Request, res: Response) {
//     try {
//       const prevLevelId: string = req.params.prevLevelId;
//       console.log('units controller: getNextLevelId', prevLevelId);
//       const nextLevelId = await UnitsManager.getNextLevelId(prevLevelId);
//       if (!nextLevelId) {
//         return res.status(404).json({ message: 'nextLevelId not found' });
//       }

//       res.status(200).json({ nextLevelId });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async getMany(_req: Request, res: Response) {
//     try {
//       const units = await UnitsManager.getAllUnits();
//       console.log(units);
//       res.status(200).json({ units });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async update(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       const fieldsToUpdate: Partial<UnitsType> = req.body;

//       const updatedUnit = await UnitsManager.updateUnit(unitId, fieldsToUpdate);

//       if (!updatedUnit) {
//         return res.status(404).json({ message: 'unit not found' });
//       }

//       res.status(200).json({ updatedUnit });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async createNewLevel(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       console.log('controller - createNewLevel', unitId);
//       const updatedUnit = await UnitsManager.createNewLevel(unitId);
//       if (!updatedUnit) {
//         return res.status(404).json({ message: 'unit not found' });
//       }
//       res
//         .status(201)
//         .json({ message: 'level created successfully', updatedUnit });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async suspendLevel(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.unitId;
//       const levelId: string = req.params.levelId;

//       const updatedUnit = await UnitsManager.suspendLevelByUnitId(
//         unitId,
//         levelId
//       );

//       if (!updatedUnit) {
//         return res
//           .status(404)
//           .json({ message: 'unit not found / level was already suspended' });
//       }

//       res.status(200).json({ updatedUnit });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async unsuspendLevel(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.unitId;
//       const levelId: string = req.params.levelId;

//       const updatedUnit = await UnitsManager.unsuspendLevelByUnitId(
//         unitId,
//         levelId
//       );

//       if (!updatedUnit) {
//         return res
//           .status(404)
//           .json({ message: 'unit not found / level was already unsuspended' });
//       }

//       res.status(200).json({ updatedUnit });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached

//   static async delete(req: Request, res: Response) {
//     try {
//       const unitId: string = req.params.id;
//       const status = await UnitsManager.deleteUnit(unitId);

//       if (!status) {
//         return res.status(404).json({ message: 'Unit not found' });
//       }

//       res.status(200).json({ status });
//     } catch (error: any) {
//       console.error('Controller Error:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } // chached
// }
