const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

function signToken(user) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn,
    });
}

exports.createAuthor = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(String(password), 10);

        const author = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: "author",
        });

        const token = signToken(author);

        return res.status(201).json({
            success: true,
            message: "Author created successfully",
            token,
            data: {
                id: author._id,
                name: author.name,
                email: author.email,
                role: author.role,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating author",
            error: error.message,
        });
    }
};

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await User.find({ role: "author" }).select("-password");

        return res.status(200).json({
            success: true,
            data: authors,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching authors",
            error: error.message,
        });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;

        const author = await User.findOne({ _id: id, role: "author" }).select(
            "-password"
        );

        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: author,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching author",
            error: error.message,
        });
    }
};
