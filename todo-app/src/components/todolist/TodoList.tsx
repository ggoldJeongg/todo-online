import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import { collection, query, onSnapshot } from "firebase/firestore";
import { UserInterface } from "../../interfaces/user.interface";
import { fireStoreJob } from "../../initFirebase";

export interface TodoListProps {
  userInfo: UserInterface | null;
}

export interface TList {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList({ userInfo }: TodoListProps) {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([]);

  useEffect(() => {
    const q = query(collection(fireStoreJob, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TList, "id">),
      }));
      setTodoList(todos);
    });

    return () => unsubscribe();
  }, []);

  const textDeleteHandler = (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
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
    <div>
      <div>
        <span>
          Hello
          <strong>{userInfo?.displayName}</strong>
        </span>
      </div>
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
          userInfo={userInfo}
          inputText={inputText}
          setInputText={setInputText}
        />
      </div>
    </div>
  );
}
