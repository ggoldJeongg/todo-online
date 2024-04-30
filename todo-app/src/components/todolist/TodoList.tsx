import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { UserInterface } from "../../interfaces/user.interface";
import { fireStoreJob } from "../../initFirebase";
import AbilityGraph from "../abilitylist/AbilityGraph";
import {
  TodoLayout,
  ProfileSection,
  CardSection,
  TodoSection,
  AbilityGraphSection,
} from "../../styles/TodoLayout.styled";
import { StyledSelect } from "../../styles/CreateTodo.styled";
import Header from "../header/Header";
import profile from "../../assets/img/profile.png";

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
          where("uid", "==", userInfo.uid)
        );
      } else {
        // 특정 카테고리 필터링
        q = query(
          collection(fireStoreJob, "todos"),
          where("uid", "==", userInfo.uid),
          where("category", "==", categoryFilter)
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

  const onClickComplete = async (id: string) => {
    const docRef = doc(fireStoreJob, "todos", id);
    await updateDoc(docRef, {
      status: "DONE",
    });
  };

  const textDeleteHandler = async (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header userName={userInfo?.displayName} />
      <TodoLayout className="todoListContainer">
        <ProfileSection>
          <img src={profile} alt="프로필" />
        </ProfileSection>
        <CardSection>{/* 동기부여 카드 컴포넌트 */}</CardSection>
        <TodoSection>
          <StyledSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">모든 능력치</option>
            <option value="체력">체력</option>
            <option value="창의력">창의력</option>
            <option value="지력">지력</option>
            <option value="정서">정서</option>
            <option value="재력">재력</option>
          </StyledSelect>
          {todoList
            .filter((item) => item.status !== "DONE")
            .map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                text={item.text}
                status={item.status}
                category={item.category}
                onComplete={onClickComplete}
                onDelete={textDeleteHandler}
              />
            ))}
          <CreateTodo
            userInfo={userInfo}
            inputText={inputText}
            setInputText={setInputText}
          />
        </TodoSection>
        <AbilityGraphSection>
          <AbilityGraph />
        </AbilityGraphSection>
      </TodoLayout>
    </>
  );
}
