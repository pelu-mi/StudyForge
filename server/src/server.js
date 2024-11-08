import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
import userRouter from "./routes/user.route.js";

dotenv.config()



const PORT = process.env.PORT || 5050;
const app = express();
connectDB(process.env.ATLAS_URI);


app.use(express.json());
app.use("/user", userRouter);





app.listen(PORT, () => {
    console.log(`Server running efficiently on port ${PORT}`);
  });