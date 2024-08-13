import chai from 'chai';
import User from '../models/user.js';
import Task from '../models/task.js';

const { expect } = chai;

describe('User Model', () => {
  after(async () => {
    await Task.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  it('should create a user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
    });

    expect(user).to.have.property('id');
    expect(user).to.have.property('name', 'John Doe');
    expect(user).to.have.property('email', 'john.doe@example.com');
  });

  it('should not create a user with duplicate email', async () => {
    await User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'hashedpassword',
    });

    try {
      await User.create({
        name: 'Another User',
        email: 'jane.doe@example.com',
        password: 'anotherpassword',
      });
      throw new Error('User was created with a duplicate email');
    } catch (error) {
      expect(error.message).to.match(/повторяющееся значение ключа нарушает/);
    }
  });
});