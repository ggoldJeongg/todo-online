import styled from "@emotion/styled";

export const Control = styled.div`
  display: flex;
  gap: 6px;
`;

export const Input = styled.input`
  flex-grow: 1;
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 20px;
  color: white;
`;

export const Button = styled.button`
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 0 12px;
  flex-shrink: 0;
  color: white;
`;

export const Select = styled.select`
  border: 1px solid gray;
  border-radius: 6px;
  background-color: transparent;
  padding: 0 12px;
  flex-shrink: 0;
  color: white;
`;
