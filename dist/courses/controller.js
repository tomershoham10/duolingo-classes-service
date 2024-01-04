import CoursesManager from "./manager.js";
import CoursesModel from "./model.js";
import capitalizeWords from "../utils/capitalizeWords.js";
export default class CoursesController {
    static async create(req, res) {
        try {
            const { name, units } = req.body;
            const isExisted = await CoursesModel.findOne({ name: name });
            if (isExisted) {
                console.error('course already existed');
                return res.status(403).json({ error: 'course already existed' });
            }
            const course = { name: capitalizeWords(name), units: units };
            const newCourse = await CoursesManager.createCourse(course);
            if (!!newCourse) {
                return res.status(201).json({ message: "course created successfully", newCourse });
            }
            else {
                throw new Error('Course controller create error.');
            }
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const courseId = req.params.id;
            console.log("courses controller", courseId);
            const course = await CoursesManager.getCourseById(courseId);
            if (!course) {
                return res.status(404).json({ message: "course not found" });
            }
            res.status(200).json({ course });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getByName(req, res) {
        try {
            const courseName = req.params.courseName;
            console.log("courses controller - getByName", courseName);
            const course = await CoursesManager.getCourseByName(capitalizeWords(courseName));
            if (!course) {
                return res.status(404).json({ message: "course not found" });
            }
            res.status(200).json({ course });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getUnitsById(req, res) {
        try {
            const courseId = req.params.id;
            console.log("controller: getUnitsById", courseId);
            const units = await CoursesManager.getUnitsByCourseId(courseId);
            if (!units) {
                return res.status(404).json({ message: "units not found" });
            }
            res.status(200).json({ units });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getFirstLessonId(req, res) {
        try {
            const courseId = req.params.id;
            console.log("controller: getFirstLessonId", courseId);
            const lessonId = await CoursesManager.getFirstLessonId(courseId);
            if (!lessonId) {
                return res.status(404).json({ message: "lesson not found" });
            }
            res.status(200).json({ lessonId });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getNextUnitId(req, res) {
        try {
            const pervUnitId = req.params.pervUnitId;
            console.log("course controller: pervUnitId", pervUnitId);
            const nextUnitId = await CoursesManager.getNextUnitId(pervUnitId);
            if (!nextUnitId) {
                return res.status(404).json({ message: "nextUnitId not found" });
            }
            res.status(200).json({ nextUnitId });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async getMany(_req, res) {
        try {
            const courses = await CoursesManager.getAllCourses();
            console.log("get all courses", courses);
            res.status(200).json({ courses });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const courseId = req.params.id;
            const fieldsToUpdate = req.body;
            const updatedCouse = await CoursesManager.updateCourse(courseId, fieldsToUpdate);
            if (!updatedCouse) {
                return res.status(404).json({ message: "unit not found" });
            }
            res.status(200).json({ updatedCouse });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const courseId = req.params.id;
            const status = await CoursesManager.deleteCourse(courseId);
            if (!status) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=controller.js.map