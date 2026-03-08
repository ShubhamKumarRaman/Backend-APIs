const Post = require("../models/postModel")
const Comment = require("../models/commentModel")
const User = require("../models/userModel");

exports.createComment = async (req,res)=>{
    try {
        const {post, user, body} = req.body;
        const userId = req.user?.id || user;

        if(!post || !userId || !body){
            return res.status(400).json({
                success:false, 
                message:"All fields are required",
            })
        }

        const existingPost = await Post.findById(post);

        if(!existingPost){
            return res.status(404).json({
                success:false, 
                message:"Post not found"
            })
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const comment = await Comment.create({
            post, 
            user: userId, 
            body,
        })

        const updatedPost = await Post.findByIdAndUpdate(
            post, 
            {$push:{comments:comment._id}},
            {new:true}
        ).populate("comments");

        return res.status(201).json({
            success:true, 
            message:"Comment added successfully", 
            data:updatedPost
        })

    } catch (error) {   
        return res.status(500).json({
            success:false, 
            message:"Error while creating comment", 
            error:error.message,
        })
    }
}