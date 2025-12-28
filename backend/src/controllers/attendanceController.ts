import { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service";

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const data = req.body; // Typé via DTO côté TypeScript
    const result = await attendanceService.createAttendance(data);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAttendanceBySession = async (req: Request, res: Response) => {
  const sessionId = Number(req.params.sessionId);
  const attendances = await attendanceService.getAttendanceBySession(sessionId);
  res.json(attendances);
};
