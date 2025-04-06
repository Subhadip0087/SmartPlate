import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { menuRouter } from "./src/routes/menu.routes"
import { cartRouter } from "./src/routes/cartItem.routes"
const app = express()
const port=process.env.PORT||8000
app.use(
    cors({
        origin: "http://localhost:3003",
        credentials: true,
        methods: "GET, POST, PUT, DELETE, OPTIONS",
    })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    console.log("GET")
    res.json({
        message:"Hello from Express Server"
    })
})
app.use("/api",menuRouter)
app.use("/api", cartRouter);
app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}/`)
 
})