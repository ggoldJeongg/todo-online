import { useDispatch, useSelector } from "react-redux";
import "./Controls.css";
import React, { useState } from "react";
import { addTodo, setFilter } from "./store/todoSlice";

const Controls = () => {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(addTodo(text));
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div className="controls">
      <input
        type="text"
        className="input"
        value={text}
        onChange={handleChange}
      />
      <button className="button" onClick={handleSubmit}>
        추가
      </button>
      <select
        className="select"
        value={state.filterType}
        onChange={handleChangeFilterType}
      >
        <option value="ALL">전체</option>
        <option value="TODO">할 일</option>
        <option value="COMPLETED">완료</option>
      </select>
    </div>
  );
};

export default Controls;
