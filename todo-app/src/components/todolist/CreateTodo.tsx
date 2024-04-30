import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { fireStoreJob } from "../../initFirebase";
import { UserInterface } from "../../interfaces/user.interface";
import {
  TodoCreateContainer,
  StyledForm,
  StyledSelect,
  StyledInput,
  StyledButton,
} from "../../styles/CreateTodo.styled";

interface CreateTodoProps {
  userInfo: UserInterface | null;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

// interface InputTextProps {
//   inputText: string;
//   setInputText: React.Dispatch<React.SetStateAction<string>>;
// }

export default function CreateTodo({
  userInfo,
  inputText,
  setInputText,
}: CreateTodoProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("체력");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() === "") {
      alert("할 일을 입력하세요.");
      return;
    }

    // Firestore에 데이터 저장
    if (userInfo) {
      await addDoc(collection(fireStoreJob, "todos"), {
        uid: userInfo.uid,
        text: inputText,
        category: selectedCategory,
        createdAt: new Date(),
      });
    } else {
      console.log("사용자 정보가 없습니다.");
    }

    setInputText("");
  };

  return (
    <>
      <TodoCreateContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="체력">체력</option>
            <option value="창의력">창의력</option>
            <option value="지력">지력</option>
            <option value="정서">정서</option>
            <option value="재력">재력</option>
          </StyledSelect>
          <StyledInput
            type="text"
            placeholder="할 일을 입력하세요."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <StyledButton type="submit">할일 추가</StyledButton>
        </StyledForm>
      </TodoCreateContainer>
    </>
  );
}
