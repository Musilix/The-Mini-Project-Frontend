import { useState } from "react";

export default function useTextInputState(initialState) {
  const [inputState, changeInputState] = useState("");

  const handleReset = () => {
    changeInputState("");
  };

  const handleChange = (e) => {
    changeInputState(e.target.value);
  };

  return [inputState, handleChange, handleReset];
}
