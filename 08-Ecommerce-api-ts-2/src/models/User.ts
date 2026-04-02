import mongoose, { Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    matchedPassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.matchedPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model<IUser>("User", userSchema);