import { useState } from "react";

export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(false); // trueだとスナップショットテストに引っかかる（__snapshot__ディレクトリのファイルと乖離がないかチェックするため）
  const handleClick = () => {
    setState((prevState) => !prevState);
  };

  return <button onClick={handleClick}>
    {state ? "ON" : "OFF"}
  </button>
};