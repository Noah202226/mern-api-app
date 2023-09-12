import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const API =
    process.env.NODE_ENV === "production"
      ? "https://mern-api-app.vercel.app/api/goals"
      : "http://localhost:8080/api/goals";
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) =>
        res
          .json()
          .then((data) => {
            setGoals(data);
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {goals?.map((goal) => (
        <li key={goal?._id} onClick={() => console.log(goal._id)}>
          {goal?.text}
        </li>
      ))}
    </>
  );
}

export default App;
