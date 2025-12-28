import { Router } from "express";
import * as attendanceController from "../controllers/attendanceController";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", attendanceController.createAttendance);
router.get("/session/:sessionId", attendanceController.getAttendanceBySession);

export default router;
