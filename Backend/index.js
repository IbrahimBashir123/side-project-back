import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import product from "./routes/product_route.js";
import user from "./routes/user_route.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/", product);
app.use("/", user);

const PORT = process.env.PORT || 3000;

await connectDB();

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
