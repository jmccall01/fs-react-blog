import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.get("/", (req, res)=>{
    res.send("Home Page")
})


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });