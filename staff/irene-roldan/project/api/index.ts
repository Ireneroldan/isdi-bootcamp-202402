import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './data/logger.ts';
import usersRouter from './routes/users.ts';
import boardsRouter from './routes/boards.ts';
import tasksRouter from './routes/tasks.ts';

dotenv.config();

const { MONGODB_URL, PORT } = process.env;

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express();

        api.use(cors());

        api.use('/users', usersRouter);
        api.use('/boards', boardsRouter);
        api.use('/', tasksRouter);

        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`));
    })
    .catch(error => logger.error(error));
