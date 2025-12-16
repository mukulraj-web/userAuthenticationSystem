import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import {User} from "./models/user.models.js"
import {passwordHashing, comparePassword} from "./utils/bcrypt.js";

dotenv.config({});

const port = process.env.PORT || 3000;
await connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))


//  Register user
app.get("/", (req,res)=>{
    res.send("home route")
    // console.log("home route requested", req);
}) 
app.post("/register",async(req,res) => {
    // get data from req.body
    const {email, username, password} = req.body;
    //  checking username and email recieved.
    if(!email || !username || !password){
        res.status(400).send("email and username i required");
    }
    // checking if the user exists
    const existedEmail = await User.findOne({email});
    const existedUsername = await User.findOne({username});

    if(existedEmail || existedUsername){
        return res.status(400).send("user already exists..")
    }
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
app.post("/login",async (req,res)=> {
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
    res.status(201).json(
        { message:"user successfully logged in....",
        user
});
    
})


app.listen(port, ()=> {
    console.log(`App is running on port ${port}`);
})