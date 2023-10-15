import dotenv from "dotenv";
dotenv.config();
const config = {
    http: {
        port: process.env.PORT || 8080,
    },
    db: {},
};
export default config;
//# sourceMappingURL=config.js.map