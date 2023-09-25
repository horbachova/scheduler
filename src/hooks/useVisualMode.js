import { useState}  from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    const transition = (newMode, replace = false) => {
    setMode(newMode);

   // For transtioning into a new visual mode
    setHistory(history => {
      if (replace) {
        const newHistory = [...history];
        newHistory.splice(-1, 1, newMode);
        return newHistory;
      } else {
        return [...history, newMode];
      }
    });
  };


  //For going back to the previous visual mode
    const back = () => {
    let newArr = [...history];
        newArr.pop(mode);
        setHistory((prev) => newArr);
        if (history.length > 1) {
            setMode((prev) => newArr[(newArr.length - 1)]);
        }
    };

  return {
    mode,
    transition,
    back
  };
}