import CancelButton from "./library/CancelButton"
import SubmitButton from "./library/SubmitButton"

function EditTask(){
    return <section>
        <form action="">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" />

            <label htmlFor="description">Description</label>
            <input type="description" />

            <select name="columnTypes" id="">
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
            </select>
            
            <SubmitButton>Save</SubmitButton>

        </form>

        
        
    </section>
}
export default EditTask