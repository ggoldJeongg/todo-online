import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserInterface } from "../interfaces/user.interface";
import { SignUp } from "../pages/signup/signUp";
import { Login } from "../pages/signup/login";
import { Link } from "react-router-dom";
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
            <Route
              path="/todo"
              element={<TodoList userInfo={userInfo} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Link to="/todo" />} />
            <Route path="/todo" element={<TodoList userInfo={userInfo} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />{" "}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
