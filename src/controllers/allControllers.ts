import type { Request, Response } from "express";
import { prisma } from "..";
import { comparePassword, hashPassword } from "../../utils/bycript.utils";
import { jwtsign } from "../../utils/jwt.utils";

export class AllControllers {
  static async register(req:Request,res:Response){
    try {
      const { username,email, password } = req.body;
      await prisma.user.create({
        data:{
          username,
          email,
          password: await hashPassword(password)
        }
      })
      res.status(201).json({message:'User created'})
    }catch(err){
      console.log('test');
      res.status(500).json({err})
    }
  }
  static async login(req:Request,res:Response){
    try {
      const { username,password } = req.body;
      const user = await prisma.user.findUnique({
        where:{
          username,
        }
      })
      if(!user) {
        res.status(404).json({message:'User not found'})
        return
      }

      const pass = await comparePassword(password,user.password)
      if(!pass) {
        res.status(401).json({message:'Invalid password'})
        return
      }
      const token = await jwtsign(user.id)
      res.status(200).json({message:'User found',token})
    }catch(err){
      res.status(500).json({err})
    }
  }
  // checklist
  static async getChecklist(req:Request,res:Response){
    try {
      //@ts-ignore
      const userId = req.userId;
      const checklists = await prisma.checklist.findMany({
        where:{
          userId:Number(userId)
        }
      })
      
      res.status(200).json({checklists})
    }catch(err){
      // console.log(err);
      res.status(500).json({err})
    }
  }
  static async createChecklist(req:Request,res:Response){
    try {
      //@ts-ignore
      const userId = req.userId;
      const { name } = req.body;
      await prisma.checklist.create({
        data:{
          name,
          userId:Number(userId)
        }
      })
      res.status(201).json({message:'Checklist created'})
    }catch(err){
      res.status(500).json({err})
    }
  }
  static async deleteChecklist(req:Request,res:Response){
    try {
      //@ts-ignore
      const userId = req.userId;
      const { id } = req.params;
      const checklist = await prisma.checklist.findUnique({
        where:{
          id:Number(id)
        }
      })
      if(!checklist){
        res.status(404).json({message:'Checklist not found'})
        return
      }
      if(checklist.userId !== Number(userId)){
        res.status(401).json({message:'Unauthorized'})
        return
      }
      await prisma.checklist.delete({
        where:{
          id:Number(id)
        }
      })
      res.status(200).json({message:'Checklist deleted'})
    }catch(err){
      res.status(500).json({err})
    }
  }
  // item
  static async getItem(req:Request,res:Response){
    try {
      //@ts-ignore
      const { id } = req.params;
      const items = await prisma.item.findMany({
        where:{
          checklistId:Number(id)
        }
      })
      res.status(200).json({items})
    }catch(err){
      res.status(500).json({err})
    }
  }
  static async createItem(req:Request,res:Response){
    try {
      //@ts-ignore
      const { id } = req.params;
      const { name } = req.body;
      await prisma.item.create({
        data:{
          name,
          checklistId:Number(id)
        }
      })
      res.status(201).json({message:'Item created'})
    }catch(err){
      res.status(500).json({err})
    }
  }
  static async getItemById(req:Request,res:Response){
    try {
      //@ts-ignore
      const { itemId } = req.params;
      const item = await prisma.item.findUnique({
        where:{
          id:Number(itemId)
        }
      })
      if(!item){
        res.status(404).json({message:'Item not found'})
        return
      }
      res.status(200).json({item})
    }catch(err){
      res.status(500).json({err})
    }
  }
  static async updateItem(req:Request,res:Response){
    try {
      //@ts-ignore
      const { itemId } = req.params;
      const { name } = req.body;
      await prisma.item.update({
        where:{
          id:Number(itemId)
        },
        data:{
          name
        }
      })
      res.status(200).json({message:'Item updated'})
    }catch(err){
      res.status(500).json({err})
    }
  }
  static async deleteItem(req:Request,res:Response){
    try {
      //@ts-ignore
      const { itemId } = req.params;
      await prisma.item.delete({
        where:{
          id:Number(itemId)
        }
      })
      res.status(200).json({message:'Item deleted'})
    }catch(err){
      res.status(500).json({err})
    }
  }
}