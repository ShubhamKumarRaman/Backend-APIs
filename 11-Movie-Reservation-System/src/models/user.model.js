import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true, 
            trim:true
        },
        email: {
            type: String,
            unique: true,
            required:true, 
            lowercase:true, 
            index:true
        },
        password: {
            type: String,
            required:true, 
            select:false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user', 
            index:true
        }
    }, { timestamps: true }
)

export default mongoose.model("User", userSchema);