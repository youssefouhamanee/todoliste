import React, { Component } from 'react';
import TodosList from "./TodosList"
import axios from 'axios'
import { get } from 'https';
import Addtodo from './Addtodo';


class AppTodos extends Component {
    state = {
        todos: [],
        current: '',
        filter: 'all',
        search: '',

    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(res => {

                this.setState({
                    todos: res.data.slice(0, 30)
                })
            })

    }

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id != id)
        })
    }

    addTodo = (e) => {
        e.preventDefault()
        let todo = {
            userId: 8,
            id: Math.random(),
            title: this.state.current,
            completed: false
        }
        this.setState({
            todos: [...this.state.todos, todo],
            current: ''
        })
    }
    handleChange = (e) => {
        this.setState({
            current: e.target.value
        })
    }
    handleChangeFilter = (e) => {
        this.setState({
            filter: e.target.value
        })
    }
    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    updateTodo = (id, title, completed) => {
        const todos = this.state.todos.map(todo => todo.id == id ? { ...todo, title, completed } : todo)
        this.setState({
            todos
        })
    }
    changeCompleted = () => {
        let todos = this.state.todos.map(todo => ({ ...todo, completed: !todo.completed }))
        this.setState({
            todos
        })
    }
    render() {
        let todos = []

        if (this.state.filter == "all") {
            todos = this.state.todos;
        } else if (this.state.filter == "done") {
            todos = this.state.todos.filter(todo => todo.completed)
        } else if (this.state.filter == "active") {
            todos = this.state.todos.filter(todo => !todo.completed)
        }

        const filterTodos = todos.filter(todo => todo.title.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1)

        return (
            <div className="container">
                <div className="row">
                    <div className="col mt-2">
                        <b>Todo list</b> <button onClick={this.changeCompleted} className="btn btn-warning float-right">Completed</button>
                    </div>
                </div>
                <hr />
                <input type="text" className="form-control col-md-3" placeholder="search" value={this.state.search} onChange={this.handleSearch} />
                <div>
                    <Addtodo addTodo={this.addTodo} current={this.state.current} handleChange={this.handleChange} />
                </div>
                <div>
                    All({this.state.todos.length}) <input type="radio" value="all" onChange={this.handleChangeFilter} name="filter" checked={this.state.filter == 'all' ? true : false} /> |
        Active({this.state.todos.filter(todo => !todo.completed).length}) <input type="radio" value="active" onChange={this.handleChangeFilter} name="filter" checked={this.state.filter == 'active' ? true : false} /> |
        Done({this.state.todos.filter(todo => todo.completed).length})<input type="radio" value="done" onChange={this.handleChangeFilter} name="filter" checked={this.state.filter == 'done' ? true : false} />
                </div>
                <ul>
                    {
                        filterTodos.map(todo =>
                            <TodosList todo={todo} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                        )
                    }
                </ul>

            </div >
        );
    }
}

export default AppTodos;

