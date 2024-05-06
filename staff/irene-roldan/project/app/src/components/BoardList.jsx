import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Board from './Board'
import '../index.css'

import { useContext } from '../context';

function BoardList({ stamp, onEditBoardClick }) {
    const [boards, setBoards] = useState([]);
    const [sharedBoards, setSharedBoards] = useState([]);

    const { showFeedback } = useContext();

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
    };

    useEffect(() => {
        loadBoards();
        loadSharedBoards();
    }, [stamp]);

    const handleBoardDeleted = () => loadBoards();
    const handleEditClick = board => onEditBoardClick(board);

    logger.debug('BoardList -> render');

    return (
        <div>
            <section>
                <h3 className="text-xl text-gray-800 font-bold mb-4">My boards</h3>
                {boards.map(board => (
                    <Board key={board.id} item={{...board, userId: null}} onEditClick={handleEditClick} onDeleted={handleBoardDeleted} />
                ))}
            </section>
    
            <section>
                <h3 className="text-xl text-gray-800 font-bold mb-4">Boards shared with me</h3>
                {sharedBoards.map(board => (
                    <Board key={board.id} item={{...board, userId: null}} />
                ))}
            </section>
        </div>
    );
}

export default BoardList;
