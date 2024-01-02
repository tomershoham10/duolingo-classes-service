import CoursesManager from "./manager.js";
export default class CoursesController {
    static async create(req, res, next) {
        try {
            const { name, units } = req.body;
            const course = { name: name, units: units };
            const newCourse = await CoursesManager.createCourse(course);
            res.status(201)
                .json({ message: "course created successfully", newCourse });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getById(req, res, next) {
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
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getUnitsById(req, res, next) {
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
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getNextUnitId(req, res, next) {
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
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const courses = await CoursesManager.getAllCourses();
            console.log("get all courses", courses);
            res.status(200).json({ courses });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ err: "Internal Server Error" });
            next(err);
        }
    }
    static async update(req, res, next) {
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
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const courseId = req.params.id;
            const status = await CoursesManager.deleteCourses(courseId);
            if (!status) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" });
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map