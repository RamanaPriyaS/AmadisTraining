export function Dashboard({ isLoggedIn }:{isLoggedIn:boolean}) {
  return (
    <div>Print isLoggedIn Value :
      {isLoggedIn && <h1>{isLoggedIn.toString()}</h1>}
    </div>
  );
}
