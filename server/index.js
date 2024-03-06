import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {db} from "./db.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;
db.connect();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      const name = (Date.now()+file.originalname).replace(/\s/g, "_");
      cb(null, name);
    }
  })
  
  const upload = multer({ storage: storage })

app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
}));
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.get("/", (req, res)=>{
    res.send("Home Page")
})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file);
  })


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });