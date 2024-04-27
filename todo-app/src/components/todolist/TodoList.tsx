import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { UserInterface } from "../../interfaces/user.interface";
import { fireStoreJob } from "../../initFirebase";
import AbilityGraph from "../abilitylist/AbilityGraph";

export interface TodoListProps {
  userInfo: UserInterface | null;
}

export interface TList {
  id: string;
  text: string;
  status: string;
  category: string;
}

export default function TodoList({ userInfo }: TodoListProps) {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      let q;
      if (categoryFilter === "") {
        // 모든 카테고리 보기
        q = query(
          collection(fireStoreJob, "todos"),
          where("uid", "==", userInfo.uid),
          where("status", "!=", "DONE")
        );
      } else {
        // 특정 카테고리 필터링
        q = query(
          collection(fireStoreJob, "todos"),
          where("uid", "==", userInfo.uid),
          where("category", "==", categoryFilter),
          where("status", "!=", "DONE")
        );
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TList, "id">),
        }));
        setTodoList(todos);
      });

      return () => unsubscribe();
    }
  }, [userInfo, categoryFilter]);

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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">모든 능력치</option>
          <option value="체력">체력</option>
          <option value="창의력">창의력</option>
          <option value="지력">지력</option>
          <option value="정서">정서</option>
          <option value="재력">재력</option>
        </select>
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            status={item.status}
            category={item.category}
            onDelete={textDeleteHandler}
          />
        ))}
        <CreateTodo
          userInfo={userInfo}
          inputText={inputText}
          setInputText={setInputText}
        />
      </div>
      <AbilityGraph />
    </div>
  );
}
