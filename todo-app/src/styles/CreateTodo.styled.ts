import styled from "styled-components";

export const TodoCreateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 5px;
`;

export const StyledForm = styled.form`
  display: flex;
  padding: 5px;
  width: 100%;
  justify-content: space-evenly;
`;

export const StyledSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  background-color: white;
`;
export const StyledInput = styled.input`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 70%;
`;

export const StyledButton = styled.button`
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  margin: 5px;
  background-color: pink;
  color: navy;
  cursor: pointer;

  &:hover {
    background-color: pink;
    color: black;
  }
`;
