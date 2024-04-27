import { useEffect, useState } from "react"
import logic from '../logic/index'
import { useParams } from 'react-router-dom'
import { useContext } from '../context'

function BoardPage() {
    const { showFeedback } = useContext()
    const [board, setBoard] = useState(null)
    const { boardId } = useParams() 

    useEffect(() => {
        try {
            logic.retrieveOneBoard(boardId)
                .then(boardText => setBoard({ text: boardText })) 
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [boardId]) 

    return (
        <>
            <header>
                {board && <h1>{board.text}</h1>} 
            </header>

            <main>
                <div>
                    <h3>TODO</h3>
                    <button>Add new task</button>
                </div>

                <div>
                    <h3>DOING</h3>
                    <button>Add new task</button>
                </div>

                <div>
                    <h3>REVIEW</h3>
                    <button>Add new task</button>
                </div>

                <div>
                    <h3>DONE</h3>
                    <button>Add new task</button>
                </div>
            </main>
        </>
    )
}

export default BoardPage
