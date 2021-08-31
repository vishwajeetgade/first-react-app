import React, { Component } from 'react';
import TodoList from './TodoList';
import './SimpleTodo.css';
import TodoForm from './TodoForm';
import * as apiCalls from './TodosAPI';


export default class SimpleTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        this.LoadTodos();
    }

    async LoadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({ todos })
    }

    async addTodo(val){
        let newTodo = await apiCalls.createTodo(val);
        this.setState({todos: [...this.state.todos, newTodo]})
    }

    async deleteTodo(id){
        await apiCalls.deleteTodo(id);
        const todos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: todos})
    }

    async toggleTodo(t){
       let updateTodo = await apiCalls.updateTodo(t);
        const todos = this.state.todos.map(todo => (
            (todo._id === updateTodo._id) ? {...todo, completed: !todo.completed} : todo
        ));
        this.setState({todos: todos})
    }

    render() {
        let todo = this.state.todos.map((t) => (
            <TodoList 
                key={t._id} {...t} 
                deleteTodo={this.deleteTodo.bind(this, t._id)} 
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ))
        return (
            <div className="mt-3 text-center">
                <h4>To-do List</h4>
                <TodoForm addTodo={this.addTodo}/>
                <ul className="list">
                    {todo}
                </ul>
            </div>
        )
    }
}
