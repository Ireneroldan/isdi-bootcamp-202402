import { useState, useEffect } from 'react'

function useArchived() {
    const [archivedTasks, setArchivedTasks] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/archived`) 
            .then(response => response.json())
            .then(data => setArchivedTasks(data))
            .catch(error => console.error('Error fetching archived tasks:', error))
    }, [])

    return archivedTasks
}

export default useArchived
