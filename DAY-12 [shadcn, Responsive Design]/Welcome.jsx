import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Play} from "lucide-react";
function Welcome() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const startQuiz = (event) => {
    event.preventDefault();
    const name = username.trim();
    const regex = /^[A-Za-z][A-Za-z0-9_]{2,}$/;
    if (name === "") {
      setError("Username is required.");
      return;
    }
    if (!regex.test(name)) {
      setError(
        "Username must start with a letter, contain only letters, digits and underscore, and be at least 3 characters long.");
      return;
    }
    setError("");
    navigate({
      to: "/quiz",
      search: {
        username: name,
      },
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-200">
      <Card className=" w-[700px] py-10 px=6">
        <CardHeader>
          <CardTitle className="text-center">
            Welcome to Quiz App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={startQuiz} className="space-y-4">
            <div>
              <Label htmlFor="username">Enter Username</Label>
              <br />
              <Input
                id="username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && (<p className="mt-2 text-sm text-red-500">{error}</p>)}
            </div>
            <Button className="w-full" type="submit" variant="default">
              <Play/>Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Welcome;