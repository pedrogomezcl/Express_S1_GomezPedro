/*
-- Lógica del JWT --
*/
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

export default class UserController{
    constructor(){
        this.userModel = new UserModel();
    }


    async register(req,res){
        try{
            const {name,email,password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);

            if(existingUser){
                res.status(400).json({
                    msg:"El usuario ya existe"
                });
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await this.userModel.createUser({
                name,
                email,
                password:hashedPassword
            });
            res.status(201).json({
                msg:"Usuario registrado con éxito!!!",newUser
            })
        }//{name,email,password} --> password usada por bcrypt para que vaya cifrada
        catch(err){
            res.status(500).json({error:err.message});
        }
    }

    async login(req,res){
        try{
            const {name,email,password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);

            if(!existingUser){
                res.status(404).json({
                    msg:"El usuario no existe"
                });
            }
        }
        catch(err){}
    }


}