import { useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

export interface TList {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([]);

  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const textInputHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: TList = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputText("");
  };

  const textDeleteHandler = (id: number) => {
    setTodoList(todoList.filter((TodoItem) => TodoItem.id !== id));
  };

  const textUpdateHandler = (newTodo: TList): void => {
    const newTodoList = todoList.map((item) => {
      if (item.id === newTodo.id) {
        return newTodo;
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  return (
    <div className="todoListContainer">
      {todoList.map((item) => (
        <TodoItem
          id={item.id}
          text={item.text}
          completed={item.completed}
          onClickDelete={textDeleteHandler}
          onClickUpdate={textUpdateHandler}
        />
      ))}
      <CreateTodo
        onChange={textTypingHandler}
        onSubmit={textInputHandler}
        inputText={inputText}
      />
    </div>
  );
}
