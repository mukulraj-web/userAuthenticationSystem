import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import connectDb from "./db/index.js";
import {app} from "./app.js"


const port = process.env.PORT || 3000;
connectDb()
.then(()=> {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err);
})

