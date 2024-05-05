import logic from '../logic'
import { useState } from 'react'

function EditTask({ task, onCancel, onUpdateTasks }) {
  const [view, setView] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const title = form.title.value
    const description = form.description.value
    const columnType = form.columnType.value

    try {
      logic
        .editTask(task.id, title, description, columnType)
        .then(() => {
          onUpdateTasks() 
          form.reset()
          onCancel() 
        })
        .catch((error) => {
          console.error("Error updating task", error)
        })
    } catch (error) {
      console.error("Error updating task", error)
    }
  }

  const handleCancelClick = () => {
    setView(false)
    onCancel()
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" defaultValue={task.title} />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" defaultValue={task.description} />

        <label htmlFor="columnType">Column Type</label>
        <select
          name="columnType"
          id="columnType"
          defaultValue={task.columnType}
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
          <option value="archived">Archived</option>
        </select>

        <button type="submit">Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  )
}

export default EditTask
