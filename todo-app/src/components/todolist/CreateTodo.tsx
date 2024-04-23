import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { fireStoreJob } from "../../initFirebase";
import { UserInterface } from "../../interfaces/user.interface";

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
        completed: false,
        createdAt: new Date(),
      });
    } else {
      console.log("사용자 정보가 없습니다.");
    }

    setInputText("");
  };

  return (
    <div className="todoCreateContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
