import { Request, Response } from "express";
import * as sessionService from "../services/session.service";

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const getSessions = async (_: Request, res: Response) => {
  const sessions = await sessionService.getSessions();
  res.json(sessions);
};
