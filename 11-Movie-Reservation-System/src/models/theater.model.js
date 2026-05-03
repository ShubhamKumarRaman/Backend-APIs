import mongoose, { mongo } from "mongoose";

const theaterSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:true, 
            index:true,
        }, 
        location:{
            city:String, 
            address:String, 
            pincode:String,
        }, 
        screens:[
            {
                type:mongoose.Schema.Types.ObjectId, 
                ref:'Screen'
            }
        ]
    }, {timestamps:true}
)

export default mongoose.model("Theater", theaterSchema);