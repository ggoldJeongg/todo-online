import React from 'react';
import "./TodoList.css"
import TodoItem from './TodoItem';

const TodoList = () => {
    return (
        <div className='todo-list'>
            <div className='todo-header'>
                <input type="checkbox" className='todo-checkbox' />
                <p className='todo-header-text'>할일1</p>
                <button className='todo-header-button'>삭제</button>
            </div>
            <div><TodoItem /></div>
        </div>
    );
};

export default TodoList;