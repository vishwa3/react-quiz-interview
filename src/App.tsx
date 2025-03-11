import { useState, useRef } from "react";

const arr = [
  {
    question: "What is the capital of France",
    options: ["Paris", "Madrid", "Brussels", "Stockholm"],
    answer: "Paris",
    id: "1",
  },
  {
    question: "What is 2+2",
    options: ["4", "9", "6", "5"],
    answer: "4",
    id: "2",
  },
];

interface IQuizQuestion {
  question: string;
  answer: string;
  options: string[];
  id: string;
}

interface ISelection extends IQuizQuestion {
  selectedAnswer: string;
}

import "./App.css";

function App() {
  const [selections, setSelections] = useState<ISelection[]>([]);
  const myRef = useRef<HTMLDivElement>(null);
  function handleSubmit(): void {
    const ref = myRef.current;
    if (!ref) return;

    ref.style.display = "block";

    const score = selections.reduce(
      (acc, currentValue) =>
        acc + (currentValue.selectedAnswer === currentValue.answer ? 1 : 0),
      0
    );
    ref.textContent = `Your Score: ${score}`;
  }
  function handleCheck(item: IQuizQuestion, op: string): boolean {
    const a =
      selections?.find((b) => b.question === item.question)?.selectedAnswer ===
      op;
    return a;
  }

  return (
    <div>
      <table>
        <tbody>
          {arr.map((item: IQuizQuestion, index: number) => {
            return (
              <tr key={item.id}>
                <td>{`${index + 1}. `}</td>
                <td>
                  <p>{item.question}</p>
                  {item.options.map((op: string) => {
                    const optionId = `${item.id}-${op}`;
                    return (
                      <div key={optionId}>
                        {" "}
                        <input
                          type="radio"
                          id={optionId}
                          name={item.id}
                          onChange={() =>
                            setSelections((prevSelections) => {
                              const existing = prevSelections.find(
                                (c: ISelection) => c.question === item.question
                              );
                              if (existing) {
                                return prevSelections.map((d: ISelection) =>
                                  d.question === item.question
                                    ? { ...d, selectedAnswer: op }
                                    : d
                                );
                              } else {
                                return [
                                  ...prevSelections,
                                  {
                                    ...item,
                                    selectedAnswer: op,
                                  },
                                ];
                              }
                            })
                          }
                          checked={handleCheck(item, op)}
                        />
                        <label htmlFor={optionId}>{op}</label>
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button disabled={selections.length < 2} onClick={() => handleSubmit()}>
        Submit Quiz
      </button>
      <div ref={myRef} className="score" style={{ display: "none" }}>
        Your score:{" "}
      </div>
    </div>
  );
}

export default App;
