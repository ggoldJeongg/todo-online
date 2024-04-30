import React from "react";
import Logout from "../../pages/logout/logout";
import { HeaderContainer } from "../../styles/TodoLayout.styled";

interface HeaderProps {
  userName: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <HeaderContainer>
      <span>
        <strong>{userName}</strong>님, 결국 해야 할 일은 하게 되어있어요...
      </span>
      <Logout />
    </HeaderContainer>
  );
};

export default Header;
