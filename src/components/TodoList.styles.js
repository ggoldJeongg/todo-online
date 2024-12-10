import styled from "@emotion/styled";

export const TodoListDiv = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  margin-top: 16px;
`;

export const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  gap: 12px;
`;

export const TodoHeaderText = styled.div`
  flex-grow: 1;
  color: white;
`;

export const TodoHeaderButton = styled.div`
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
