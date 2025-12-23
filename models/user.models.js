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
            // mistakenly added
            // unique: true,
            // lowercase: true
        },
        // coverImage : {
        //     type:String,
        //     required: true
        // }

    }, {timestamps: true})

    export const User = mongoose.model("User", userSchema)