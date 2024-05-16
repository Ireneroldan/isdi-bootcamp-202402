import logic from '../logic'

function EditTask({ task, onCancel, onUpdateTasks }) {
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
        onCancel()
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <section className="bg-white p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="title" className="block">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        defaultValue={task.title}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />

                    <label htmlFor="description" className="block">
                        Description
                    </label>
                    <textarea
                        id="description"
                        defaultValue={task.description}
                        className="w-full h-32 resize-y border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />

                    <label htmlFor="columnType" className="block">
                        Status
                    </label>
                    <select
                        name="columnType"
                        id="columnType"
                        defaultValue={task.columnType}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                        <option value="archived">Archived</option>
                    </select>

                    <div className="flex justify-center space-x-4">
                        <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Save</button>
                        <button type="button" onClick={handleCancelClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    )

}

export default EditTask
