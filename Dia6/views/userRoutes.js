import express from "express";
import jwt from "jsonwebtoken";
import UserController from "../controllers/userController";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const userController = new UserController();

//Middleware para verificar el token de JWT
function authMiddleware(req,res,next){
    const token = req.headers["Authorization"]?.split(" ")[1];

    if(!token) return res.status(403).json({msg:"Token Requerido"});


    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({msg:"Token Inválido"});
        req.user=decoded;
        next();
    });   
}

//Rutas públicas

//