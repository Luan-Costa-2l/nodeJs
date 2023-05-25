import { Request, Response } from "express";
import { Task } from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
    const { title } = req.body;

    if (title) {
        const newTask = await Task.create({ title });
        res.status(201);
        res.json({ newTask });
    }
    res.json({ error: "title cannot be null" })
}

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.findAll();
    res.json({ tasks });
}

export const updateTask = async (req: Request, res: Response) => {
    const { done, title } = req.body;
    const id: string = req.params.id;
    const updatedTask = await Task.findByPk(id);

    if (!updatedTask) {
        res.status(404);
        res.json({ error: "Task Not Found" });
        return;
    }
    if (title) {
        updatedTask.title = title;
    }
    if (done) {
        switch (done.toLowerCase()) {
            case 'false':
            case '0':
                updatedTask.done = false;
                break;
            case 'true':
            case '1':
                updatedTask.done = true;
                break;
            default:
                res.json({error: "Invalid done value"});
                break;
        }
    }
    await updatedTask.save();
    res.json({ updatedTask });
}

export const deleteTask = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (task) {
        await task.destroy();
    }
    res.json({});
}