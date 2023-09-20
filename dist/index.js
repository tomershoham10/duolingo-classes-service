import mongoose from "mongoose";
import startServer from "./server.js";
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Lessons");
        console.log("connected");
        startServer();
    }
    catch (e) {
        console.log(e);
    }
})();
//# sourceMappingURL=index.js.map