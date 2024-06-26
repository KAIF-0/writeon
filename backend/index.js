import express from "express"
import mongoose, { mongo } from "mongoose"
import dotenv  from "dotenv"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/post.js"
import commentRoutes from "./routes/comment.js"
import { errorMiddleware } from "./middleware/error.js"
import cors from "cors"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"


dotenv.config();

const app = express()
const port = process.env.BACKEND_PORT

app.use(express.json());
app.use(bodyparser.json())
app.use(cors())
app.use(cookieParser())




mongoose.connect(process.env.MONGO_STRING)
.then(
()=> console.log("Mongodb is connected!")
)
.catch(
    (err)=> console.log(err)
)


const __dirname = path.resolve();


app.use('/app', authRoutes)
app.use('/app', userRoutes)
app.use('/app', postRoutes)
app.use('/app', commentRoutes)


//frontend static folder(for render)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,  '../frontend/dist/index.html'));
  });

//middleware for error
app.use(errorMiddleware)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})