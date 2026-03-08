const Post = require("../models/postModel")
const Like = require("../models/likeModel")
const User = require("../models/userModel");

//Like post
exports.likePost = async (req,res)=>{
    try {
        const {post, user} = req.body;
        const userId = req.user?.id || user;

        if(!post || !userId){
            return res.status(400).json({
                success:false, 
                message:"Post and user are required",
            })
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const existingLike = await Like.findOne({ post, user: userId });

        if(existingLike){
            return res.status(400).json({
                success:false, 
                message:"User already liked this post",
            })
        }

        const like = await Like.create({ post, user: userId })

        const updatedPost = await Post.findByIdAndUpdate(
            post, 
            {$push:{likes:like._id}}, 
            {new:true}
        ).populate("likes");

        return res.status(200).json({
            success:true, 
            message:"Post liked successfully", 
            data:updatedPost,
        })

    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Error while liking post", 
            error:error.message,
        })
    }
}

//Unlike post
exports.unlikePost = async(req,res)=>{
    try {
        const {post, user} = req.body;
        const userId = req.user?.id || user;

        if(!post || !userId){
            return res.status(400).json({
                success:false,
                message:"Post and user are required",
            })
        }

        const deletedLike = await Like.findOneAndDelete({ post, user: userId })

        if(!deletedLike){
            return res.status(404).json({
                success:false, 
                message:"Like not found"
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post, 
            {$pull:{likes:deletedLike._id}}, 
            {new:true}
        ).populate("likes")

        return res.status(200).json({
            success:true, 
            message:"Post unliked successfully", 
            data:updatedPost,
        })

    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Error while unliking post", 
            error:error.message
        })
    }
}