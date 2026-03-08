const Post = require('../models/postModel')
const User = require("../models/userModel");

//Create post
exports.createPost = async (req, res) => {
    try {
        const { title, body, author, tags, status, slug } = req.body;
        const authorId = req.user?.id || author;

        if (!title || !body || !authorId) {
            return res.status(400).json({
                success: false,
                message: "Title, body and author are required",
            })
        }

        const authorUser = await User.findById(authorId);

        if (!authorUser) {
            return res.status(404).json({
                success: false,
                message: "Author not found",
            });
        }

        if (authorUser.role !== "author" && authorUser.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only authors can create posts",
            });
        }

        const post = await Post.create({
            title,
            body,
            author: authorId,
            tags,
            status,
            slug,
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating post",
            error: error.message,
        })
    }
}

// Get all posts (with pagination)
exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const posts = await Post.find()
            .populate("author", "name email role")
            .populate("likes")
            .populate("comments")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })

        const totalPosts = await Post.countDocuments();

        return res.status(200).json({
            success:true, 
            totalPosts, 
            page, 
            data:posts,
        })

    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Error while fetching posts", 
            error:error.message,
        })
    }
}

// Get single post
exports.getPostById = async (req,res)=>{
    try {
        const {id} = req.params;

        const post = await Post.findById(id)
            .populate("author", "name email role")
            .populate("likes")
            .populate("comments");

        if(!post){
            return res.status(404).json({
                success:false, 
                message:"Post not found"
            })
        }

        return res.status(200).json({
            success:true, 
            data:post
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Error while fetching post", 
            error:error.message
        })
    }
}

// Delete Post
exports.deletePost = async(req,res)=>{
    try {
        const {id} = req.params;

        const post = await Post.findByIdAndDelete(id);

        if(!post){
            return res.status(404).json({
                success:false, 
                message:"Post not found"
            })
        }

        return res.status(200).json({
            success:true, 
            message:"Post deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Error while deleting post", 
            error:error.message,
        })
    }
}