import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Board from './Board'
import '../index.css'

import { useContext } from '../context';

function BoardList({ stamp}) {
    const [boards, setBoards] = useState([]);
    const [sharedBoards, setSharedBoards] = useState([]);

    const { showFeedback, showConfirm} = useContext();

    const loadBoards = () => {
        logger.debug('BoardList -> loadBoards');

        try {
            logic.retrieveBoards()
                .then(data => setBoards(data))
                .catch(error => showFeedback(error, 'error'));
        } catch (error) {
            showFeedback(error);
        }
    };

    const loadSharedBoards = () => {
        logger.debug('BoardList -> loadSharedBoards');

        try {
            logic.getSharedBoards()
                .then(data => setSharedBoards(data))
                .catch(error => showFeedback(error, 'error'));
        } catch (error) {
            showFeedback(error);
        }
    }

    const handleDeleteBoard = (board) => {
        logger.debug('BoardList -> handleDeleteBoard');
        showConfirm('Are you sure you want to delete this board?', confirmed => {
            if (confirmed) {
            try {
            logic.deleteBoard(board)
                .then(() => {
                    loadBoards();
                    loadSharedBoards();
                })
                .catch(error => showFeedback(error, 'error'));
        } catch (error) {
            showFeedback(error);
        }
        }
        })
    }

    useEffect(() => {
        loadBoards();
        loadSharedBoards();
    }, [stamp]); 

    logger.debug('BoardList -> render');

   return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center text-xl font-semibold text-white">
        <section className="w-full max-w-xl mb-8 p-4 border-4 border-orange-200 rounded bg-gray-800 shadow-lg">
            <h1 className="text-xl text-white font-bold mb-4 text-center">MY BOARDS</h1>
            {boards.map(board => (
                <div key={board.id} className="flex justify-between items-center">
                    <Board item={{...board, userId: null}} />
                    <button onClick={() => handleDeleteBoard(board)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#dc2626" fillRule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd"/>
                        </svg>
                        </button>
                </div>
            ))}
        </section>

        <section className="w-full max-w-xl p-4 border-4 border-orange-200 rounded bg-gray-800 shadow-lg">
            <h1 className="text-xl text-white font-bold mb-4 text-center">BOARDS SHARED WITH ME</h1>
            {sharedBoards.map(board => (
                console.log(board),
                <Board key={board.id} item={{...board, userId: null}} />
            ))}
        </section>

    </div>
)
    
}

export default BoardList;
