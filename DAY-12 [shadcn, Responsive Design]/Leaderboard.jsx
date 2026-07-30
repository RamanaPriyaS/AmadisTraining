import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Trophy} from "lucide-react";
import { RotateCcw } from "lucide-react";
function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );
  const clearLeaderboard = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the leaderboard?"
    );
    if (!confirmClear) return;
    localStorage.removeItem("leaderboard");
    setLeaderboard([]);
  }; 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-purple-200 to-indigo-300">
      <Card className="w-full max-w-3xl rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-4xl font-bold text-violet-800">
            <Trophy className="h-8 w-8 text-yellow-500" />
                Leaderboard
            </CardTitle>
        </CardHeader>
        <CardContent>
          {leaderboard.length === 0 ? (
            <div className="space-y-6 text-center">
              <p className="text-xl font-semibold text-gray-600">
                No Scores Available
              </p>
              <Button
                onClick={() =>
                  navigate({
                    to: "/",
                  })
                }
              >Start Quiz
              </Button>
            </div>
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-violet-600 text-white">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.slice(0, 10).map((player, index) => (
                    <tr
                      key={player.username}
                      className={`text-center border-b ${
                        index % 2 === 0
                          ? "bg-violet-50"
                          : "bg-white"
                      }`}
                    >
                      <td className="p-4 font-bold">

                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : index + 1}
                      </td>
                      <td className="p-4 font-semibold">
                        {player.username}
                      </td>
                      <td className="p-4 text-lg font-bold text-violet-700">
                        {player.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8 flex gap-4">
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
                  variant="destructive"
                  className="flex-1"
                  onClick={clearLeaderboard}
                >
                  Clear Leaderboard
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Leaderboard;