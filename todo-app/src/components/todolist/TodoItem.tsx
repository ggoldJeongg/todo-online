import { useState } from "react";
import { TList } from "./TodoList";
import { updateDoc, doc } from "firebase/firestore";
import { fireStoreJob } from "../../initFirebase";

interface TodoItemProps {
  id: string;
  text: string;
  status: string;
  onClickDelete(id: string): void;
  onClickUpdate(updatedTodoItem: TList): void;
}

export default function TodoItem({
  id,
  text,
  status,
  onClickDelete,
  onClickUpdate,
}: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodoItem = {
      id: id,
      text: updatedText,
      status: "ACTIVE",
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  const onClickComplete = async () => {
    const ref = doc(fireStoreJob, "todos", id);
    await updateDoc(ref, {
      status: "DONE",
    });
  };

  return (
    <div>
      {!isUpdating ? (
        <li className="todoContainer">
          {status === "DONE" ? (
            <button disabled>완료됨</button>
          ) : (
            <button onClick={onClickComplete} id={id}>
              완료하기
            </button>
          )}
          <p>{text}</p>
          <div className="buttonContainer">
            <button type="button" onClick={() => setIsUpdating(true)}>
              수정
            </button>
            <button type="button" onClick={() => onClickDelete(id)}>
              삭제
            </button>
          </div>
        </li>
      ) : (
        <li className="todoContainer">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={updatedText}
              onChange={handleInputChange}
            />
            <div className="buttonContainer">
              <button type="submit">확인</button>
              <button type="button" onClick={() => setIsUpdating(false)}>
                취소
              </button>
            </div>
          </form>
        </li>
      )}
    </div>
  );
}
