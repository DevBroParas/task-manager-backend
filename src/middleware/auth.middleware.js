import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token:", req.cookies.token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = await User.findById(decoded.id).select("-password");
        console.log("User:", req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
