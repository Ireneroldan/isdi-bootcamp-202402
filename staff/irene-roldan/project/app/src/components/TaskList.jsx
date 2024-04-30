import { logger } from '../utils';
import logic from '../logic';
import { useState, useEffect } from 'react';
import Task from './Task'; 
import { useContext } from '../context';

function TaskList({ boardId }) {
    const [tasks, setTasks] = useState([]);
    const { showFeedback } = useContext();

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasks = await logic.retrieveTasks(boardId);
                setTasks(tasks);
            } catch (error) {
                showFeedback(error, 'error');
            }
        };

        loadTasks();
    }, [boardId, showFeedback]);

    logger.debug('TaskList -> render');

    return (
        <section>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    item={task}
                />
            ))}
        </section>
    );
}

export default TaskList;
