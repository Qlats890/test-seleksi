import type { Request,Response,NextFunction } from "express";
import { jwtverify } from "../../../utils/jwt.utils";


export class JWTCheck {
  static async check(req:Request,res:Response,next:NextFunction){
    const token = req.header('Authorization');
    if(!token) {
      res.status(401).json({message:'Access Denied'});
      return
    }
    try {
      const verified = await jwtverify(token.split(' ')[1]);
      if(!verified) {
        res.status(401).json({message:'Access Denied'});
        return;
      }
      //@ts-ignore
      req.userId = verified
      return next();
    }catch(err){
      console.log(err);
      res.status(500).json({err})
    }
  }
}