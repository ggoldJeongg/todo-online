import { useState } from "react";
import { TList } from "./TodoList";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onClickDelete(id: string): void;
  onClickUpdate(updatedTodoItem: TList): void;
}

export default function TodoItem({
  id,
  text,
  completed,
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
      completed: completed,
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  return (
    <div>
      {!isUpdating ? (
        <li className="todoContainer">
          {completed ? <button>완료됨</button> : <button>완료하기</button>}
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
