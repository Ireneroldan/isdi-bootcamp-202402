import React from 'react'
import TaskList from './TaskList'

function ColumnList({ boardId, columnTypes }) {
    return (
        <div className="flex flex-col justify-center items-center w-full space-y-4">
            {columnTypes.map(columnType => (
                <div key={columnType} className="flex flex-col w-full h-60 border-4 border-gray-300 bg-white rounded p-4">
                    <h3 className="block text-xl text-gray-800 font-bold mb-1 md:mb-0 pr-4 self-start break-words">{columnType}</h3>
                    <TaskList boardId={boardId} columnType={columnType} />
                </div>
            ))}
        </div>
    );
}

export default ColumnList