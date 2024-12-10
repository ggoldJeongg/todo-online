import React, { useState, useContext } from "react";
import { TodoContext } from "../context";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../reducer";
import {
  TodoItemContainer,
  TodoText,
  TodoItemCompleted,
  TodoEditInput,
  TodoItemButton,
  TodoCheckbox,
} from "./TodoItem.styles";

const TodoItem = ({ id, text, completed }) => {
  const { dispatch } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    dispatch({ type: UPDATE_TODO, payload: { id, text: e.target.value } });
  };
  const handleToggle = () => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };
  const handleDelete = () => {
    dispatch({ type: DELETE_TODO, payload: id });
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
