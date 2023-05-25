import { Request, Response } from "express";
import { Task } from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
    const { title } = req.body;

    if (title) {
        const newTask = await Task.create({ title });
        res.status(201);
        res.json({ newTask });
    }
    res.json({ error: "title cannot be null"})
}

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.findAll();
    res.json({ tasks });
}