import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setInput("");
        setResultData("");
    };

    const onSent = async (prompt) => {
        const currentPrompt = prompt || input;
        if (!currentPrompt) return; // Prevent sending empty requests

        setLoading(true);
        setShowResult(true);
        setResultData("");
        setRecentPrompt(currentPrompt);

        if (!prompt) {
            setPrevPrompt((prev) => [...prev, input]);
            setInput("");
        }

        try {
            const response = await run(currentPrompt);
            const responseArray = response.split("**");

            let formattedResponse = responseArray.map((item, index) =>
                index % 2 === 1 ? `<b>${item}</b>` : item
            ).join("");

            const formattedResponseWithBreaks = formattedResponse.replace(/\*/g, "</br>");
            const responseWords = formattedResponseWithBreaks.split(" ");

            responseWords.forEach((word, index) => {
                delayPara(index, word + " ");
            });

            setLoading(false);
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
