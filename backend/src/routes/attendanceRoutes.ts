import { Router } from "express";
import * as attendanceController from "../controllers/attendanceController";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", attendanceController.createAttendance);
router.get("/session/:sessionId", attendanceController.getAttendanceBySession);
router.get("/by-student/:studentId", attendanceController.getAttendanceByStudent);
router.get("/by-class/:classId", attendanceController.getAttendanceByClass);
router.get("/by-period", attendanceController.getAttendanceByPeriod);


export default router;
