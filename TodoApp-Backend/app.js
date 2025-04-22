// import express from "express";
// import fs from "fs";
// import http from "http";
// import url from "url";

// const server = http.createServer((req,res) => {
//     console.log(req.url);
//     const pathName = req.url;
//     if (pathName === "/") {
//         res.end("Welcome to the Home Page")
//     }else if(pathName === "/about"){
//         res.end("Welcome to about page!")
//     }else if(pathName === "/contact"){
//         res.end("Contact Page!")
//     }else if(pathName === "/contact/form"){
//         res.end("Contact Form Page!")
//     }else{
//         res.writeHead(404, {
//             "Content-type": "text/html",
//             "my-own-header": "hello-world"
//         })
//         res.end("<h1>Page not found</h1>")
//     }
// })

// server.listen(8000, "127.0.0.1", () => {
//     console.log("Server is listening on port 8000")
// })

// const data = fs.readFile("data.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(data);

//     fs.writeFile("newFile.txt", data, (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
// })

// Express Js
// const app = express();

// app.get("/", (req, res) => {
//     res.writeHead(200, {
//         "Content-type": "text/html",
//         "my-own-header": "hello-world"
//     })
//   res.end("Welcome to Home Page");
// });

// app.listen(8000, () => {
//   console.log("Server is listening on port 8000");
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";
import { authRoutes } from "./routes/authRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";


dotenv.config();
const app = express();

const port = process.env.PORT;

// app.use(cors({
//     origin: "http://localhost:5000",
//     methods: "GET, POST, PUT, DELETE",
//     allowedHeaders: "Content-type authorization"
// }))

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
    
app.use("/auth", authRoutes )
app.use("/todo", todoRoutes)
app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

app.listen(port, () => {
    console.log("Server is listening on port 8000");
})