import React from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../initFirebase";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../styles/CreateTodo.styled";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃이 실패했습니다.", error);
    }
  };

  return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>;
};

export default Logout;
