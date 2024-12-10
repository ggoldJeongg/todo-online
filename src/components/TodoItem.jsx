import React, { useState, useContext } from "react";
import { TodoContext } from "../context";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../reducer";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "./store/todoSlice";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    dispatch(updateTodo({ id, text: e.target.value }));
  };
  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };
  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <TodoItemContainer>
      <TodoCheckbox
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      {edit ? (
        <TodoEditInput value={text} onChange={handleChange} />
      ) : (
        <TodoText>{text}</TodoText>
      )}
      <TodoItemButton onClick={handleEdit}>수정</TodoItemButton>
      <TodoItemButton onClick={handleDelete}>삭제</TodoItemButton>
    </TodoItemContainer>
  );
};

export default TodoItem;
