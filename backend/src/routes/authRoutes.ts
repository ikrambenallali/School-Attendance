import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.get("/test",async ()=>{
  const allUsers = await prisma.user.findMany();
console.log("all uesers",allUsers);  
})

export default router;
