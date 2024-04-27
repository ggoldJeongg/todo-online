import { useState } from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fireStoreJob } from "../../initFirebase";
import { TodoText, TodoContainer } from "../../styles/TodoItem.styled";

interface TodoItemProps {
  id: string;
  text: string;
  status: string;
  onDelete(id: string): void;
  category: string;
}

export default function TodoItem({
  id,
  text,
  status,
  onDelete,
}: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ref = doc(fireStoreJob, "todos", id);

    await updateDoc(ref, {
      id: id,
      text: updatedText,
      status: "ACTIVE",
    });

    setIsUpdating(false);
  };

  const onClickComplete = async () => {
    const ref = doc(fireStoreJob, "todos", id);
    await updateDoc(ref, {
      status: "DONE",
    })
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {});
  };

  const onClickDelete = async () => {
    const ref = doc(fireStoreJob, "todos", id);
    await deleteDoc(ref);
    onDelete(id);
  };

  return (
    <div>
      {!isUpdating ? (
        <TodoContainer>
          <div className="buttonContainer">
            {status !== "DONE" && (
              <button onClick={onClickComplete} id={id}>
                완료하기
              </button>
            )}
          </div>
          <TodoText status={status}>{text}</TodoText>
          <div className="buttonContainer">
            <button type="button" onClick={() => setIsUpdating(true)}>
              수정
            </button>
            <button type="button" onClick={onClickDelete}>
              삭제
            </button>
          </div>
        </TodoContainer>
      ) : (
        <TodoContainer>
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
        </TodoContainer>
      )}
    </div>
  );
}
