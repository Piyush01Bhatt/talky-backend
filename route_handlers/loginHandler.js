import crypto from "crypto";
import {UserModel} from "../db_models/dbUser.js"

export default function checkLoginRequest(req){
    const reqBody = req.body;
    if ( reqBody && (reqBody.email && reqBody.password) ){
        return reqBody;
    }else{
        return new Error("Missing Request");
    }
}

export async function findUser(reqBody){
    try {
        const userData = UserModel.findOne({ email: reqBody.email }).exec()
        if(!userData) {
            return new Error("No user found");
        }
        return userData;
    }catch(err){
        return new Error(err.message)
    }
}

export function checkPassword(dbUser, passwd) {
    try {
        const hash = crypto
          .createHash("md5")
          .update(passwd)
          .digest("hex");

        if(hash===dbUser.password){
            console.log("password matched")
            return dbUser
        }else{
            return new Error("Password not Matched")
        }      
    }catch(err){
        return new Error(err.message)
    }
}
