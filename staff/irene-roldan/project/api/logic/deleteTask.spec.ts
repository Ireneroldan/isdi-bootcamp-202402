import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Task } from '../data/index.ts'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { ObjectId } from 'mongoose'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('deleteTask', function() {
  let taskId;

  beforeEach(async () => {
      // Crear una tarea de prueba y guardar su ID
      const task = new Task({ title: 'Test Task', description: 'Test Description' });
      await task.save();
      taskId = task._id;
  });

  afterEach(async () => {
      // Limpiar la base de datos después de cada prueba
      await Task.deleteMany({});
  });

  it('should throw an error if task not found', async function() {
    try {
        await logic.deleteTask(taskId);
    } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
    }
});

  it('should delete the task if it exists', async function() {
      await logic.deleteTask(taskId);
      const task = await Task.findById(taskId);
      expect(task).to.be.null;
  });
});