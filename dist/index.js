import mongoose from "mongoose";
import startServer from "./server.js";
(async () => {
    try {
        await mongoose.connect("mongodb://mongo:27017/Classes?directConnection=true");
        console.log("connected");
        startServer();
    }
    catch (e) {
        console.log(e);
    }
})();
//# sourceMappingURL=index.js.map