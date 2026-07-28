import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import questions from "../data/questions";
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const checkAnswer = (option) => {
    if(option === questions[currentQuestion].answer){
      setScore(score + 1);
    }
    if(currentQuestion < questions.length - 1){
      setCurrentQuestion(currentQuestion + 1);
    }
    else{
      navigate({to:"/result",search:{score : option === questions[currentQuestion].answer? score + 1: score}});
    }
  };
  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <h3>{questions[currentQuestion].question}</h3>
      {questions[currentQuestion].options.map((option)=>(
        <div>
        <button key={option} onClick={()=>checkAnswer(option)}>{option}</button>
        </div>
      ))
      }
    </div>
  );
}
export default Quiz;
