import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';

function ColumnList({ boardId, columnTypes, updateTasks, tasksUpdated }) {
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        console.log('tasksUpdated:', tasksUpdated);
        if (tasksUpdated) {
            setKey(Date.now());
            // Llama a la función `updateTasks` para indicar que las tareas se han actualizado
            updateTasks();
        }
    }, [tasksUpdated, updateTasks]);

    return (
        <div>
            {columnTypes.map((columnType, index) => (
                <div key={index}>
                    <h2>{columnType}</h2>
                    <TaskList
                        key={key}
                        boardId={boardId}
                        columnType={columnType}
                        updateTasks={updateTasks}
                    />
                </div>
            ))}
        </div>
    );
}

export default ColumnList;
