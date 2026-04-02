import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export interface AuthRequest extends Request {
    user?: any;
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
        try {
            token = token.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Not Authorized, token failed" });
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({ message: "JWT Secret not configured" });
            }

            const decoded: any = jwt.verify(token, jwtSecret);
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch (error) {
            res.status(401).json({ message: "Not Authorized" })
        }
    } else {
        res.status(401).json({ message: "No token" })
    }
}

export default protect;