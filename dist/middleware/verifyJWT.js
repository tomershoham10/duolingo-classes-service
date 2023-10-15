import axios from "axios";
const authenticateAndAuthorize = async (req, res, next) => {
    try {
        const tokenHeader = req.header("Authorization");
        const token = tokenHeader.split(" ")[1];
        const response = await axios.post("http://localhost:4000/validate-token", {
            token,
        });
        if (response.data && response.data.valid) {
            next();
        }
        else {
            res.status(403).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default authenticateAndAuthorize;
//# sourceMappingURL=verifyJWT.js.map