import React from 'react'

export default function Addtodo({ addTodo, current, handleChange }) {
    return (
        <div>
            <form className="form-inline mt-2" onSubmit={addTodo}>
                <div className="form-group">
                    <label for="addTodo">add todo :*</label>
                    <input type="text" id="addTodo" className="form-control col-md-6 mr-2" placeholder="your title" value={current} onChange={handleChange} />
                    <button className="btn btn-success">add</button>
                </div>

            </form>
        </div>
    )
}
