import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import questions from "../data/questions";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
function Quiz() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/quiz",
  });
  const username = search.username;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const checkAnswer = (selectedOption) => {
    let updatedScore = score;
    if (selectedOption === questions[currentQuestion].answer) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate({
        to: "/result",
        search: {
          username: username,
          score: updatedScore,
        },
      });
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-purple-200 to-indigo-300">
        <Card className="w-full max-w-2xl "  >
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between" >
            <CardTitle className="text-3xl font-bold text-violet-700">
              Quiz App
            </CardTitle>
            <span className="rounded-full bg-violet-100 px-4 py-2 font-semibold text-violet-700">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-purple-700">
            Welcome, {username}
          </h2>
          <div className="h-3 rounded-5xl bg-gray-300">
            <div className="h-3 rounded-full bg-violet-600 
              transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`,}}>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-bold text-violet-900">
            {questions[currentQuestion].question}
          </h2>
          <div className="flex flex-col gap-4">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant="outline"
                className="justify-start py-6 text-lg hover:bg-violet-600 hover:text-white"
                onClick={() => checkAnswer(option)}>
                {option}
              </Button>
            ))}
          </div>
          <div className="flex justify-between text-lg font-semibold text-violet-700">
            <span>Score: {score}</span>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </CardContent>
      </Card>
      </div>

  );
}

export default Quiz;