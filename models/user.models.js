import mongoose, {Schema} from "mongoose";

const userSchema  = Schema(
    {
        // username, email, password
        username: {
            type: String,
            required:true,
            unique: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            // select:false :- wrong method
            // mistenly added
            // unique: true,
            // lowercase: true
        }

    }, {timestamps: true})

    export const User = mongoose.model("User", userSchema)