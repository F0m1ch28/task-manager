import chai from 'chai';
import User from '../models/user.js';
import Task from '../models/task.js';

const { expect } = chai;

describe('Task Model', () => {
  let user;

  before(async () => {
    user = await User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'hashedpassword',
    });
  });

  after(async () => {
    await Task.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  it('should create a task', async () => {
    const task = await Task.create({
      title: 'Test Task',
      description: 'This is a test task.',
      userId: user.id,
    });

    expect(task).to.have.property('id');
    expect(task).to.have.property('title', 'Test Task');
    expect(task).to.have.property('description', 'This is a test task.');
    expect(task.userId).to.equal(user.id);
  });

  it('should not create a task without title', async () => {
    try {
      await Task.create({
        description: 'This is a test task without a title.',
        userId: user.id,
      });
      throw new Error('Task was created without a title');
    } catch (error) {
      expect(error.message).to.include('notNull Violation');
    }
  });
});