import styled from "styled-components";

export const TodoLayout = styled.div`
  display: grid;
  padding: 50px;
  margin: 0px 50px 0px 50px;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 50px 10px 50px;
  padding: 10px 50px 10px 50px;
`;

export const ProfileSection = styled.section`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardSection = styled.section`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

export const TodoSection = styled.section`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

export const AbilityGraphSection = styled.section`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
