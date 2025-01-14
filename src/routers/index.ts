import express from "express";
import { AllControllers } from "../controllers/allControllers";
import { JWTCheck } from "../middlewares/jwt/jwt.middleware";

const routers = express.Router()

routers.post('/register',AllControllers.register)
routers.post('/login',AllControllers.login)

routers.get('/checklist',JWTCheck.check,AllControllers.getChecklist)
routers.post('/checklist',JWTCheck.check,AllControllers.createChecklist)
routers.delete('/checklist/:id',JWTCheck.check,AllControllers.deleteChecklist)
export{
  routers
}