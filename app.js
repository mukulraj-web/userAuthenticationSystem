import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))

// routes import
import router from "./routes/user.routes.js"

app.use("/api/v1/user", router)


export {app};