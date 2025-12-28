import { Router } from "express";
import * as sessionController from "../controllers/sessionController";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/",  sessionController.createSession);
router.get("/", sessionController.getSessions);


export default router;
