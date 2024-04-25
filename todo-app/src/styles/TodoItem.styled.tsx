import styled, { css } from "styled-components";

export const TodoText = styled.p<{ status: string }>`
  ${({ status }) =>
    status === "DONE" &&
    css`
      text-decoration: line-through;
      color: #999;
    `}
`;

export const TodoContainer = styled.li`
  // todoContainer 기본 스타일링
`;
