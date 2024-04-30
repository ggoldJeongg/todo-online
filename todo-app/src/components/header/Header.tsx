import React from "react";
import Logout from "../../pages/logout/logout";
import { HeaderContainer } from "../../styles/TodoLayout.styled";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("로그아웃 후 로그인 페이지 진입");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <span>
        <strong>{userName}</strong>님, 결국 해야 할 일은 하게 되어있어요...
      </span>
      <Logout onLogout={handleLogout} />
    </HeaderContainer>
  );
};

export default Header;
