import mongoose from 'mongoose';
import CoursesModel from './model.js';
import LevelsModel from '../levels/model.js';

export default class CoursesRepository {
  static async createCourse(
    course: Partial<CoursesType>
  ): Promise<CoursesType> {
    try {
      const newCourse = await CoursesModel.create(course);
      return newCourse;
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        console.error('Repository Validation Error:', error.message);
        throw new Error('Validation error while creating course');
      } else if (error.code === 11000) {
        console.error('Repository Duplicate Key Error:', error.message);
        throw new Error('Duplicate key error while creating course');
      } else {
        console.error('Repository Error:', error.message);
        throw new Error('Error creating course');
      }
    }
  }

  static async getCourseById(courseId: string): Promise<CoursesType | null> {
    try {
      const course = await CoursesModel.findById(courseId);
      console.log('courses repo', courseId);
      return course;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - getCourseById: ${error}`);
    }
  }

  static async getCourseByName(
    courseName: string
  ): Promise<CoursesType | null> {
    try {
      // Use case-insensitive regex search instead of exact match
      const course = await CoursesModel.findOne({ 
        name: { $regex: new RegExp('^' + courseName + '$', 'i') } 
      });
      console.log('courses repo', courseName, course);
      return course;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - getCourseByName: ${error}`);
    }
  }

  static async getCourseDataById(courseId: string): Promise<any[] | null> {
    try {
      const course = await CoursesModel.findById(courseId);
      if (!course) {
        console.warn(`Course with ID ${courseId} not found`);
        return null;
      }

      const courseObjectId = new mongoose.Types.ObjectId(courseId);
      
      // First, get all level IDs from the course
      const levelIds = course.levelsIds || [];
      console.log('Total level IDs in course:', levelIds.length);

      // Validate level IDs to ensure they are all valid ObjectIDs
      const validLevelIds = levelIds.filter(id => {
        try {
          new mongoose.Types.ObjectId(id);
          return true;
        } catch (err) {
          console.error(`Invalid level ID found: ${id}`);
          return false;
        }
      });

      if (validLevelIds.length !== levelIds.length) {
        console.error(`Found ${levelIds.length - validLevelIds.length} invalid level IDs`);
      }
      
      try {
        const courseData = await CoursesModel.aggregate([
          // Match the specific course
          { $match: { _id: courseObjectId } },
          // Lookup levels directly from levelsIds, ensuring ALL levels are included
          {
            $lookup: {
              from: 'levels',
              let: { levelsIds: '$levelsIds', suspendedLevelsIds: '$suspendedLevelsIds' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: [
                        '$_id',
                        {
                          $map: {
                            input: '$$levelsIds',
                            as: 'id',
                            in: { $toObjectId: '$$id' },
                          },
                        },
                      ],
                    },
                  },
                },
                // Sort levels based on their position in the levelsIds array to maintain order
                {
                  $addFields: {
                    sortIndex: {
                      $indexOfArray: ['$$levelsIds', { $toString: '$_id' }]
                    },
                    isSuspended: {
                      $in: [
                        { $toString: '$_id' },
                        '$$suspendedLevelsIds'
                      ]
                    }
                  }
                },
                { $sort: { sortIndex: 1 } },
                {
                  $lookup: {
                    from: 'lessons',
                    let: { lessonsIds: '$lessonsIds', suspendedLessonsIds: '$suspendedLessonsIds' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $in: [
                              '$_id',
                              {
                                $map: {
                                  input: '$$lessonsIds',
                                  as: 'id',
                                  in: { $toObjectId: '$$id' },
                                },
                              },
                            ],
                          },
                        },
                      },
                      // Add a field to indicate if the lesson is suspended
                      {
                        $addFields: {
                          isSuspended: {
                            $in: [
                              { $toString: '$_id' },
                              '$$suspendedLessonsIds'
                            ]
                          }
                        }
                      },
                      {
                        $lookup: {
                          from: 'exercises',
                          let: { exercisesIds: '$exercisesIds', suspendedExercisesIds: '$suspendedExercisesIds' },
                          pipeline: [
                            {
                              $match: {
                                $expr: {
                                  $in: [
                                    '$_id',
                                    {
                                      $map: {
                                        input: '$$exercisesIds',
                                        as: 'id',
                                        in: { $toObjectId: '$$id' },
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                            // Add a field to indicate if the exercise is suspended
                            {
                              $addFields: {
                                isSuspended: {
                                  $in: [
                                    { $toString: '$_id' },
                                    '$$suspendedExercisesIds'
                                  ]
                                }
                              }
                            },
                          ],
                          as: 'exercises',
                        },
                      },
                    ],
                    as: 'lessons',
                  },
                },
              ],
              as: 'levels',
            },
          },
        ]);

        console.log('Aggregated course data:', JSON.stringify(courseData));
        console.log('Returned levels count:', courseData[0]?.levels?.length || 0);
        
        // Verify all levels were returned
        if (courseData[0]?.levels?.length !== levelIds.length) {
          console.warn(`Warning: Expected ${levelIds.length} levels but got ${courseData[0]?.levels?.length}`);
          
          // Log which level IDs are missing
          if (courseData[0]?.levels) {
            const returnedLevelIds = courseData[0].levels.map((level: any) => level._id.toString());
            const missingLevelIds = levelIds.filter(id => !returnedLevelIds.includes(id));
            console.warn(`Missing level IDs: ${missingLevelIds.join(', ')}`);
          }
        }
        
        return courseData;
      } catch (aggError: any) {
        console.error('Aggregation pipeline error:', aggError.message);
        
        // Fallback: Try to construct course data without the complex aggregation
        console.log('Attempting fallback data retrieval method');
        
        const basicCourseData = await CoursesModel.findById(courseId).lean();
        if (!basicCourseData) return null;
        
        // For each level ID, try to fetch the level directly
        const levelIds = basicCourseData.levelsIds || [];
        const levels = [];
        
        // Attempt to fetch each level directly without the complex aggregation
        for (const levelId of levelIds) {
          try {
            const level = await LevelsModel.findById(levelId).lean();
            if (level) {
              levels.push({
                ...level,
                isSuspended: basicCourseData.suspendedLevelsIds?.includes(levelId) || false
              });
            } else {
              console.warn(`Level ID ${levelId} not found in database`);
            }
          } catch (err) {
            console.error(`Error fetching level ${levelId}:`, err);
          }
        }
        
        console.log(`Fallback method found ${levels.length} of ${levelIds.length} levels`);
        
        // Create a simplified version with the levels we were able to fetch
        return [{
          ...basicCourseData,
          levels: levels
        }];
      }
    } catch (error: any) {
      console.error('Repository Error:', error.message, error.stack);
      throw new Error(`Course repo - getCourseDataById: ${error.message}`);
    }
  }

  static async getUnsuspendedLevelsByCourseId(
    courseId: string
  ): Promise<LevelsType[]> {
    try {
      const course = await CoursesModel.findById(courseId);
      console.log(
        'courses repo - getUnsuspendedLevelsByCourseId - course',
        course
      );

      if (course) {
        const levelsIds = course.levelsIds;
        console.log(
          'courses repo - getUnsuspendedLevelsByCourseId - levelsIds',
          levelsIds
        );
        const unsuspendedLevelsIds = levelsIds.filter(
          (levelId) => !course.suspendedLevelsIds.includes(levelId)
        );
        console.log(
          'courses repo - getUnsuspendedLevelsByCourseId - unsuspendedLevelsIds',
          unsuspendedLevelsIds
        );
        const levelsDetails = await LevelsModel.find({
          _id: { $in: unsuspendedLevelsIds },
        });

        console.log(
          'courses repo getUnsuspendedLevelsByCourseId - levelsDetails',
          levelsDetails
        );
        return levelsDetails as LevelsType[];
      } else return [];
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - getLevelsByCourseId: ${error}`);
    }
  }

  static async getNextLevelId(prevLevelId: string): Promise<string | null> {
    try {
      const course = await CoursesModel.findOne({
        levelsIds: { $in: [prevLevelId] },
      });
      console.log('courses repo - getNextLevelId :', course);
      if (course) {
        const levelsIds = course.levelsIds;
        const indexOfLevel = levelsIds.indexOf(prevLevelId);
        if (indexOfLevel !== -1 && indexOfLevel + 1 < levelsIds.length) {
          const nextLevelId = levelsIds[indexOfLevel + 1];
          if (course.suspendedLevelsIds.includes(nextLevelId)) {
            await this.getNextLevelId(nextLevelId);
          }
          return nextLevelId;
        } else return 'finished';
      } else {
        return null;
      }
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - getNextLevelId: ${error}`);
    }
  }

  static async getAllCourses(): Promise<CoursesType[]> {
    try {
      const courses = await CoursesModel.find({});
      return courses;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - getAllCourses: ${error}`);
    }
  }

  static async updateCourse(
    courseId: string,
    fieldsToUpdate: Partial<CoursesType>
  ): Promise<CoursesType | null> {
    try {
      const updatedCourse = await CoursesModel.findByIdAndUpdate(
        courseId,
        fieldsToUpdate,
        { new: true }
      );
      return updatedCourse;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - updateCourse: ${error}`);
    }
  }

  static async suspendLevelByCourseId(
    courseId: string,
    levelId: string
  ): Promise<CoursesType | null> {
    try {
      const course = await CoursesModel.findById(courseId);
      if (!course) {
        return null;
      }

      const suspendedLevels = course.suspendedLevelsIds;
      if (suspendedLevels.includes(levelId)) {
        return null;
      }

      const updatedCourse = await CoursesModel.findByIdAndUpdate(
        courseId,
        { suspendedLevelsIds: [...suspendedLevels, levelId] },
        { new: true }
      );
      return updatedCourse;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - suspendLevelByCourseId: ${error}`);
    }
  }

  static async unsuspendLevelByCourseId(
    courseId: string,
    levelId: string
  ): Promise<CoursesType | null> {
    try {
      const course = await CoursesModel.findById(courseId);
      if (!course) {
        return null;
      }

      const suspendedLevelsIds = course.suspendedLevelsIds;
      if (!suspendedLevelsIds.includes(levelId)) {
        return null;
      }

      const updatedCourse = await CoursesModel.findByIdAndUpdate(
        courseId,
        {
          suspendedLevelsIds: suspendedLevelsIds.filter(
            (level) => level !== levelId
          ),
        },
        { new: true }
      );
      return updatedCourse;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - unsuspendLevelByCourseId: ${error}`);
    }
  }

  static async deleteCourse(courseId: string): Promise<CoursesType | null> {
    try {
      const status = await CoursesModel.findOneAndDelete({ _id: courseId });
      return status;
    } catch (error: any) {
      console.error('Repository Error:', error.message);
      throw new Error(`Course repo - deleteCourses: ${error}`);
    }
  }
}
