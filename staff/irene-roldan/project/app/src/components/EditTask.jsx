import logic from '../logic'

function EditTask({ task, onCancel, onUpdateTasks }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const columnType = form.columnType.value;

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
                });
        } catch (error) {
            console.error("Error updating task", error)
        }
    };

    const handleCancelClick = () => {
        onCancel();
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" defaultValue={task.title} />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" defaultValue={task.description} />

                <label htmlFor="columnType">Column Type</label>

                <select
                    className="block appearance-none w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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

                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Save</button>
                <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
}

export default EditTask;
