import React, { useContext } from "react";
import { TodoContext } from "../context";
import {
  TodoCheckbox,
  TodoHeader,
  TodoHeaderButton,
  TodoHeaderText,
  TodoListDiv,
} from "./TodoList.styles";
import TodoItem from "./TodoItem";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const completedCount = state.list.filter((item) => item.completed).length;
  const handleToggleAll = (e) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: e.target.checked });
  };
  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED });
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
    <TodoListDiv>
      <TodoHeader>
        <TodoCheckbox
          type="checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <TodoHeaderText>할일1 </TodoHeaderText>
        {completedCount > 0 && (
          <TodoHeaderButton onClick={handleDeleteCompleted}>
            {completedCount}개 선택 삭제
          </TodoHeaderButton>
        )}
      </TodoHeader>
      <TodoHeaderText>
        {filteredList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </TodoHeaderText>
    </TodoListDiv>
  );
};

export default TodoList;
