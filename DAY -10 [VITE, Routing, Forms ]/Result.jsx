import { useSearch } from "@tanstack/react-router";
function Result(){
    const search = useSearch({
        from:"/result"
    });
    return(
        <div>
            <h1>Quiz Finished</h1>
            <h2>Your Score : {search.score}</h2>
        </div>
    );
}
export default Result;