import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.findAll();
    res.json({ tasks });
}