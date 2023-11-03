import http from "http"
import path from "path"
import {Server} from "socket.io"
import express from "express"


const app = express()
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname,'../soft-academy/dist')));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,'../soft-academy/dist/index.html'))
})
const httpServer = http.Server(app);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})