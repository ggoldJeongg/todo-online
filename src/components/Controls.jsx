import { TodoContext } from "../context";
import { ADD_TODO, SET_FILTER } from "../reducer";
import { Control, Input, Button, Select } from "./Controls.styles";
import React, { useContext, useState } from "react";

const Controls = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    dispatch({ type: ADD_TODO, payload: text });
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch({ type: SET_FILTER, payload: e.target.value });
  };
  return (
    <Control>
      <Input type="text" value={text} onChange={handleChange} />
      <Button onClick={handleSubmit}>추가</Button>
      <Select value={state.filterType} onChange={handleChangeFilterType}>
        <option value="ALL">전체</option>
        <option value="TODO">할 일</option>
        <option value="COMPLETED">완료</option>
      </Select>
    </Control>
  );
};

export default Controls;
