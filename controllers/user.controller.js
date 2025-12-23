import {User} from "../models/user.models.js"
import {passwordHashing, comparePassword} from "../utils/bcrypt.js";
// import uploadOnCloudinary from "./utils/cloudinary.js"

// console.log("fetching the controllers")

const registerUser = (async(req,res) => {
    // get data from req.body
    const {email, username, password} = req.body;
    //  checking username and email recieved.
    if(!email || !username || !password){
        res.status(400).send("email and username are required");
    }
    // checking if the user exists
    const existedEmail = await User.findOne({email});
    const existedUsername = await User.findOne({username});

    if(existedEmail || existedUsername){
        return res.status(400).send("user already exists..")
    }
// getting the cover image 
    // const coverImageLocalPath = req.file?.coverImage[0].path;
    // if(!coverImageLocalPath) return res.status(400).send("Cover Image is required!!")
// uploading to cloudinary
        // const coverImage = await uploadOnCloudinary(coverImageLocalPath);
// sending response to user]

// console.log("cover Image ",coverImage);
    // hashing password
    const hashedPassword = await passwordHashing(password);
    // console.log("hashed password is : ", hashedPassword);
    
    
    const user = new User({
        email,
        username,
        password:hashedPassword
    })
    
    // save user
    const fetchedData = await user.save()
    // removing the password part.
    fetchedData.password = undefined;
    // response
    return res.status(201).json(
        {
            message:"user created successfully",
            fetchedData
        }
    )
    // console.log("Email is ", email);
})
// user Login
const loginUser = (async (req,res)=> {
    const {email, password} = req.body
    
    if(!email || !password){
    return res.status(404).res("email and password is required for login!!!");
    }
    // validating user
    const user =await User.findOne({email});
    if(!user){
        return res.status(404).res("User is not registered");
    }
   const compare = await comparePassword(password, user.password);
   if(!compare){
    return res.status(404).send("password is not matching please check the password");
   }
   user.password  = undefined
    res.status(200).json(
        { message:"user successfully logged in....",
        user
});
    
})


export {
    registerUser,
    loginUser
}