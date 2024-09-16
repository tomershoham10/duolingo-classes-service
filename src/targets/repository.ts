import TargetModel from './model.js';

export default class TargetRepository {
  static async createTarget(target: Partial<TargetType>): Promise<TargetType> {
    try {
      const existingTarget = await TargetModel.findOne({ name: target.name });
      if (existingTarget) {
        throw new Error('Target already exists');
      }

      console.log('repo - createTarget', target);

      const newTarget = await TargetModel.create(target);
      return newTarget;
    } catch (error) {
      throw new Error(`targets repo createTarget: ${error}`);
    }
  }

  static async getTargetById(targetId: string): Promise<TargetType | null> {
    try {
      const target = await TargetModel.findById(targetId);
      console.log('repo', target);
      return target;
    } catch (error) {
      throw new Error(`targets repo getTargetById: ${error}`);
    }
  }

  static async getAllTarget(): Promise<TargetType[]> {
    try {
      const targets = await TargetModel.find({});
      return targets;
    } catch (error) {
      throw new Error(`targets repo getAllTarget: ${error}`);
    }
  }

  static async getTargetAncestors(targetId: string): Promise<TargetType[]> {
    try {
      const result = await TargetModel.aggregate([
        {
          $match: { _id: targetId },
        },
        {
          $lookup: {
            from: 'targets',
            localField: 'father',
            foreignField: '_id',
            as: 'fatherInfo',
          },
        },
        {
          $unwind: '$fatherInfo',
        },
        {
          $lookup: {
            from: 'targets',
            localField: 'fatherInfo.father',
            foreignField: '_id',
            as: 'grandfatherInfo',
          },
        },
        {
          $unwind: {
            path: '$grandfatherInfo',
            preserveNullAndEmptyArrays: true, // This ensures that if there's no grandfather, it won't fail
          },
        },
        {
          $project: {
            _id: 0,
            targetId: '$_id',
            fatherId: '$fatherInfo._id',
            grandfatherId: '$grandfatherInfo._id',
          },
        },
      ]);

      console.log('getTargetAncestors repo: ', result);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw new Error(`targets repo getAllTarget: ${error}`);
    }
  }

  static async updateTarget(
    targetId: string,
    fieldsToUpdate: Partial<TargetType>
  ): Promise<TargetType | null> {
    try {
      const updatedTarget = await TargetModel.findByIdAndUpdate(
        targetId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedTarget;
    } catch (error) {
      throw new Error(`targets repo updateTarget: ${error}`);
    }
  }

  static async deleteTarget(targetId: string): Promise<TargetType | null> {
    try {
      const status = await TargetModel.findOneAndDelete({ _id: targetId });
      return status;
    } catch (error) {
      throw new Error(`targets repo deleteTarget: ${error}`);
    }
  }
}
