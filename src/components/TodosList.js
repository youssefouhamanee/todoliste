import React, { Component } from 'react'
import { NavLink } from "react-router-dom"


class TodosList extends Component {
    state = {
        isEdit: false,
        title: this.props.todo.title,
        completed: this.props.todo.completed
    }
    handleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    handleGetValue = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleChecked = (e) => {
        this.setState({
            completed: e.target.checked
        })
    }
    saveTodo = () => {
        this.props.updateTodo(this.props.todo.id, this.state.title, this.state.completed)
        this.setState({
            isEdit: false
        })
    }
    render() {
        return (


            this.state.isEdit ? <li key={this.props.todo.id}>

                <input type="text" value={this.state.title} onChange={this.handleGetValue} />
                |<input type="checkbox" onChange={this.handleChecked} checked={this.state.completed ? true : false} />
                | <button className="btn btn-primary btn-sm" onClick={this.saveTodo}>Save</button>

            </li>
                : <li key={this.props.todo.id}>
                    <NavLink to={'todopost/' + this.props.todo.id}>{this.props.todo.title}</NavLink> | {this.props.todo.completed ? 'done' : 'active'} | <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteTodo(this.props.todo.id)}> delete </button>
                    | <button onClick={this.handleEdit} className="btn btn-info btn-sm">Edit</button>
                </li>


        )
    }
}
export default TodosList