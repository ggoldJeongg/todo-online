import { useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

interface TList {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([
    {
      id: 1,
      text: "할일 1",
      completed: false,
    },
    {
      id: 2,
      text: "할일 2",
      completed: false,
    },
  ]);

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

  return (
    <div className="todoListContainer">
      {todoList.map((item) => (
        <TodoItem
          id={item.id}
          text={item.text}
          completed={item.completed}
          onClickDelete={textDeleteHandler}
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
