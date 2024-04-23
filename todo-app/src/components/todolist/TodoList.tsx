import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { UserInterface } from "../../interfaces/user.interface";
import { fireStoreJob } from "../../initFirebase";

export interface TodoListProps {
  userInfo: UserInterface | null;
}

export interface TList {
  id: string;
  text: string;
  status: string;
}

export default function TodoList({ userInfo }: TodoListProps) {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([]);

  useEffect(() => {
    if (userInfo) {
      const q = query(
        collection(fireStoreJob, "todos"),
        where("uid", "==", userInfo.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todos = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<TList, "id">),
          }))
          .filter((todo) => todo.status !== "DONE");
        setTodoList(todos);
      });

      return () => unsubscribe();
    }
  }, [userInfo]);

  const textDeleteHandler = async (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
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
            status={item.status}
            onDelete={textDeleteHandler}
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
