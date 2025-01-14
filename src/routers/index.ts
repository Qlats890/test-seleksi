import express from "express";
import { AllControllers } from "../controllers/allControllers";
import { JWTCheck } from "../middlewares/jwt/jwt.middleware";

const routers = express.Router()

routers.post('/register',AllControllers.register)
routers.post('/login',AllControllers.login)

routers.get('/checklist',JWTCheck.check,AllControllers.getChecklist)
routers.post('/checklist',JWTCheck.check,AllControllers.createChecklist)
routers.delete('/checklist/:id',JWTCheck.check,AllControllers.deleteChecklist)

routers.get('/checklist/:id/item',JWTCheck.check,AllControllers.getItem)
routers.post('/checklist/:id/item',JWTCheck.check,AllControllers.createItem)
routers.get('/checklist/:id/item/:itemId',JWTCheck.check,AllControllers.getItemById)
routers.put('/checklist/:id/item/:itemId',JWTCheck.check,AllControllers.updateItem)
routers.delete('/checklist/:id/item/:itemId',JWTCheck.check,AllControllers.deleteItem)

routers.put('/checklist/:id/item/rename/:itemId',JWTCheck.check,AllControllers.renameItem)

export{
  routers
}