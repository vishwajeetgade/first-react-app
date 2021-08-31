import React from 'react';
import './TodoList.css';

export default function TodoList({ name, completed, _id, deleteTodo, onToggle }) {

    return (
        <li>
            <span  style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={onToggle}>
                {name}
            </span>
            <span onClick={deleteTodo}>X</span>
        </li>
    )
}

