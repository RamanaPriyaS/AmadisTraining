import { useEffect } from "react"; 
import { useNavigate, useSearch } from "@tanstack/react-router"; 
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
function Result() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/result",
  });
  const username = search.username;
  const score = search.score;
  useEffect(() => {
    const leaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    const existingPlayer = leaderboard.find(
      (player) => player.username === username
    );
    if (existingPlayer) {
      if (score > existingPlayer.score) {
        existingPlayer.score = score;
      }
    } else {
      leaderboard.push({
        username,
        score,
      });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(
      "leaderboard",
      JSON.stringify(leaderboard)
    );
  }, [username, score]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-purple-300 to-indigo-400">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl">
        <CardHeader className="space-y-4">
          <CardTitle className="text-center text-3xl font-bold text-violet-800">
            🎉 Quiz Finished
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-violet-700">
            Congratulations,
          </h2>
          <h1 className="text-3xl font-bold text-purple-700">
            {username}
          </h1>
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-violet-600 text-5xl font-bold text-white">
            {score}
          </div>
          <p className="text-lg font-medium text-gray-700">
            You scored {" "}
            <span className="font-bold">{score}</span>{" "}
           out of 15
          </p>
          <div className="flex w-full gap-3">
            <Button
              className="flex-1"
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
            >
            <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() =>
                navigate({
                  to: "/leaderboard",
                })
              }
            >
              Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Result;