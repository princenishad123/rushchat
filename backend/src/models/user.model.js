import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trime: true
    },
    fullname: {
        type: String,
        required: true,
        trime: true
    },
    password: {
        type: String,
        required: true,
        trime: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;