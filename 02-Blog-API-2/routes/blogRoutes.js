const express = require('express')
const router = express.Router();

const auth = require("../middlewares/authMiddleware");

//Import Controllers
const { createComment } = require("../controllers/commentController")

const {
    createPost,
    getAllPosts,
    getPostById,
    deletePost
} = require('../controllers/postController')

const {
    likePost,
    unlikePost,
} = require('../controllers/likeController')

// ------------------- Posts ----------------------------

// Create post
router.post('/posts', auth, createPost);

// get all posts
router.get('/posts', getAllPosts);

// get single post
router.get('/posts/:id', getPostById);

// delete post
router.delete('/posts/:id', auth, deletePost);

//------------------- Comments ---------------------
router.post('/comments', auth, createComment);

//------------------- Likes ------------------------

//Like a post
router.post('/likes', auth, likePost);

//Unlike a post
router.delete('/likes', auth, unlikePost);

//Export Router
module.exports = router;