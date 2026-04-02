import type { Request, Response } from "express";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "User exists" });
    }

    const user = await User.create({ name, email, password });

    res.json({
        _id: user._id,
        token: generateToken(user._id.toString())
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchedPassword(password))) {
        res.json({
            _id: user._id,
            token: generateToken(user._id.toString())
        })
    } else {
        res.status(401).json({ message: "Invalid Credentials" })
    }
}