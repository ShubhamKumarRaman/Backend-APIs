const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
    createAuthor,
    getAllAuthors,
    getAuthorById,
} = require("../controllers/userController");

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);

// Authors
router.post("/authors", createAuthor);
router.get("/authors", getAllAuthors);
router.get("/authors/:id", getAuthorById);

module.exports = router;
