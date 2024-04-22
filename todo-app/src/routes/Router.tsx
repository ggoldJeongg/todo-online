import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserInterface } from "../interfaces/user.interface";
import { SignUp } from "../pages/signup/signUp";
import { Login } from "../pages/signup/login";
import TodoList from "../components/todolist/TodoList";

type AppRouterType = {
  isLogin: boolean;
  userInfo: UserInterface | null;
};

export const AppRouter = ({ isLogin, userInfo }: AppRouterType) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<TodoList userInfo={userInfo} />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
