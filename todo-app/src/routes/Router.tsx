import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/todo" : "/login"} />}
        />

        {isLogin ? (
          <>
            <Route
              path="/todo"
              element={<TodoList userInfo={userInfo} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
