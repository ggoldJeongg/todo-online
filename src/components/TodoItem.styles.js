import styled from "@emotion/styled";

export const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  gap: 12px;
`;

export const TodoText = styled.p`
  flex-grow: 1;
  color: white;
`;

export const TodoItemCompleted = styled.p`
  text-decoration: line-through;
`;

export const TodoEditInput = styled.input`
  flex-grow: 1;
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 20px;
  color: white;
`;

export const TodoItemButton = styled.button`
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 0 12px;
  flex-shrink: 0;
  color: white;
`;

export const TodoCheckbox = styled.input`
  width: 16px;
  height: 16px;
`;
