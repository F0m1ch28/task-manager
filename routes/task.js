import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, description, user_id } = req.body;
        const task = await Task.create({ title, description, user_id });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;