import "./App.css";
import { useState, useEffect } from "react";
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";
import Example3 from "./components/Example3";
import { fetchBio } from "./Api";
import Loader from "./components/Loader";

function App() {
  const [currentBio, setCurrentBio] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      fetchBio().then((newBio) => {
        setCurrentBio(newBio);
        setLoading(false);
      });
    }
  }, [loading]);
  if (loading)
    return (
      <div className={"row"}>
        <Loader />
        loading...
      </div>
    );
  return (
    <>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 1</h2>
        <Example1 currentBio={currentBio} setCurrentBio={setCurrentBio} />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 2 (useTransition)</h2>
        <Example2 currentBio={currentBio} setCurrentBio={setCurrentBio} />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 3 (useOptimistic)</h2>
        <Example3 currentBio={currentBio} setCurrentBio={setCurrentBio} />
      </div>
    </>
  );
}

export default App;
