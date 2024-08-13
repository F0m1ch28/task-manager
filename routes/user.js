import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;