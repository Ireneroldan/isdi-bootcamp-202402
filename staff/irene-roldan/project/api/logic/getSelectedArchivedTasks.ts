import { User, Board, Task } from '../data/index.ts'


async function getSelectedArchivedTasks(boardId) {
    try {
        const selectedArchivedTasks = await Task.find({ boardId: boardId, columnType: 'archived' });

        return selectedArchivedTasks;
    } catch (error) {
        throw new Error('Failed to retrieve selected archived tasks');
    }
}

export { getSelectedArchivedTasks };
