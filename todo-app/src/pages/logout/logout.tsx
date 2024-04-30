import React from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../initFirebase";
import { StyledButton } from "../../styles/CreateTodo.styled";

interface LogoutProps {
  onLogout: () => void; // onLogout은 함수이며, 반환값이 없는 함수(void)
}

const Logout: React.FC<LogoutProps> = ( { onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("로그아웃 되었습니다.");
      onLogout();
    } catch (error) {
      console.error("로그아웃이 실패했습니다.", error);
    }
  };

  return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>;
};

export default Logout;
