import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import User from './models/user.js';
import Task from './models/task.js';

dotenv.config();

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

sequelize
  .sync({ force: true })
  .then(() => console.log('Database & tables synchronized!'))
  .catch(err => console.error('Failed to sync database:', err));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user == null) return res.status(400).json({ error: 'User not found' });

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken });
    } else {
      res.status(403).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res.status(400).json({
      error: 'Missing required fields',
      details: { title, description },
    });
  }

  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;