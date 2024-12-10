import React, { useContext } from "react";
import { TodoContext } from "../context";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoCompleted, toggleTodoAll } from "./store/todoSlice";

const TodoList = () => {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const completedCount = state.list.filter((item) => item.completed).length;
  const handleToggleAll = (e) => {
    dispatch(toggleTodoAll(e.target.checked));
  };
  const handleDeleteCompleted = () => {
    dispatch(deleteTodoCompleted());
  };
  const filteredList = state.list.filter((item) => {
    switch (state.filterType) {
      case "TODO":
        return !item.completed;
      case "COMPLETED":
        return item.completed;
      default:
        return true;
    }
  });
  const isAllCompleted =
    filteredList.length > 0 && filteredList.every((item) => item.completed);
  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="todo-header-text">할일1</p>
        {completedCount > 0 && (
          <button
            className="todo-header-button"
            onClick={handleDeleteCompleted}
          >
            {completedCount}개 선택 삭제
          </button>
        )}
      </div>
      <div>
        {filteredList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
