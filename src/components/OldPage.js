import React, { useContext, useEffect, useState } from "react";
import { fetchBio } from "../Api";
import Loader from "./Loader";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";
import ThemeContext from "../theme";

const OldPage = () => {
  const [currentBio, setCurrentBio] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext); //<-- React 18

  // Code uses React without suspense
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
        <Loader color={theme.color} />
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
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 3 (useOptimistic)</h2>
        <Example4 currentBio={currentBio} setCurrentBio={setCurrentBio} />
      </div>
    </>
  );
};
export default OldPage;
