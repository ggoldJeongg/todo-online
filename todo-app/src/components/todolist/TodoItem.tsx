import { useState } from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fireStoreJob } from "../../initFirebase";
import {
  TodoText,
  TodoContainer,
  CheckboxButton,
  IconButton,
  ModifyContainer,
} from "../../styles/TodoItem.styled";
import {
  StyledForm,
  StyledInput,
  StyledButton,
} from "../../styles/CreateTodo.styled";
import { ReactComponent as Checkbox } from "../../assets/icon/Checkbox.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icon/DeleteIcon.svg";
import { ReactComponent as WriteIcon } from "../../assets/icon/WriteIcon.svg";

interface TodoItemProps {
  id: string;
  text: string;
  status: string;
  onDelete(id: string): void;
  onComplete(id: string): void;
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
    });
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
              <CheckboxButton onClick={onClickComplete} id={id}>
                <Checkbox />
              </CheckboxButton>
            )}
          </div>
          <TodoText status={status}>{text}</TodoText>
          <div className="buttonContainer">
            <IconButton type="button" onClick={() => setIsUpdating(true)}>
              <WriteIcon />
            </IconButton>
            <IconButton type="button" onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </TodoContainer>
      ) : (
        <TodoContainer>
          <StyledForm onSubmit={handleFormSubmit}>
            <StyledInput
              type="text"
              placeholder="수정할 내용을 입력하세요."
              value={updatedText}
              onChange={handleInputChange}
            />
            <ModifyContainer>
              <StyledButton type="submit">확인</StyledButton>
              <StyledButton type="button" onClick={() => setIsUpdating(false)}>
                취소
              </StyledButton>
            </ModifyContainer>
          </StyledForm>
        </TodoContainer>
      )}
    </div>
  );
}
