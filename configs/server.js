"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        //origin: 'https://proyecto-bancario-404.web.app',
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:", "http://localhost:5173", "http://localhost:3000"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
        crossOriginResourcePolicy: false 
    }));
    app.use(morgan("dev"))
    }


const routes = (app) =>{
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}
