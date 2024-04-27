import React from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../initFirebase";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃이 실패했습니다.", error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
