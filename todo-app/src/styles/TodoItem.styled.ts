import styled from "styled-components";

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 50px 10px 50px;
`;

export const ModifyContainer = styled.div`
  display: flex;
`;

export const TodoText = styled.p<{ status: string }>`
  font-family: Century Gothic, sans-serif;
  display: flex;
  align-items: center;
  margin: 5px 20px 5px 20px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 5px;

  &:hover {
    background-color: pink;
    border-radius: 5px;
  }
`;

export const CheckboxButton = styled.button`
  background: none;
  border: none;
  padding: 5px;

  &:hover {
    background-color: pink;
    border-radius: 5px;
  }
`;
