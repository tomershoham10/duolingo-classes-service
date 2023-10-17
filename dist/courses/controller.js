import CoursesManager from "./manager.js";
export default class CoursesController {
    static async create(req, res, next) {
        try {
            const { type, units } = req.body;
            const reqCourse = { type: type, units: units };
            const newCourse = await CoursesManager.createCourse(reqCourse);
            res.status(201)
                .json({ message: "Course created successfully", newCourse });
        }
        catch (error) {
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
            next(error);
        }
    }
    static async getMany(_req, res, next) {
        try {
            const courses = await CoursesManager.getAllCourses();
            console.log(courses);
            res.status(200).json({ courses });
        }
        catch (err) {
            next(err);
            res.status(500).json({ err: "Internal Server Error" });
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
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const courseId = req.params.id;
            const status = await CoursesManager.deleteCourse(courseId);
            if (!status) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json({ status });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=controller.js.map