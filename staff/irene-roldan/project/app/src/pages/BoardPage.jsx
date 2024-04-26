import { useContext, useEffect, useState } from "react"
import logic from '../logic'
import { useParams } from 'react-router-dom'



function BoardPage(props) {
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()

    return <>
        <header>
            <h1>hi</h1>
        </header>
    </>
}

export default BoardPage