import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = (newMode, replace = false) => {
        if (replace) {
            setMode((prev) => newMode)
            let replaceArr = [...history];
            replaceArr[replaceArr.length - 1] = mode;
            setHistory((prev) => replaceArr);
        } else {
            setMode((prev) => newMode);
            let newArr = [...history];
            newArr.push(newMode);
            setHistory((prev) => newArr);
        }
    };

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
    }
}