// routes/boards.ts
import express from 'express';
import {
    createBoardHandler,
    retrieveOneBoardHandler,
    retrieveBoardHandler,
    deleteBoardHandler,
    shareBoardWithUsersHandler,
    getShareBoardsHandler
} from './handlers/index.ts';

const { json } = express
const jsonBodyParser = json()
const router = express.Router();

router.post('/', jsonBodyParser, createBoardHandler);
router.get('/', retrieveBoardHandler);
router.get('/id/:boardId', retrieveOneBoardHandler);
router.delete('/:boardId', deleteBoardHandler);
router.post('/shared', jsonBodyParser, shareBoardWithUsersHandler);
router.get('/shared', getShareBoardsHandler);

export default router;
