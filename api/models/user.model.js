import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        select: false,
    },
    avatar: {
        type: String,
        default: ""
    }
},{
    timestamps: true // It will tell mongoose to record time when user was created so we can filter out later when we want.
});

const User = mongoose.model('User', userSchema);
export default User;