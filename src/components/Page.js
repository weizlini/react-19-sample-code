import { use, useEffect, useRef, useState } from "react";
import { fetchBio } from "../Api";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";
import Example5 from "./Example5";

// the clincher for using "use" with a promise is that the promise INSTANCE must
// be created outside of the component not just the Async function defined outside
// of the functional component ...
const bioPromise = fetchBio();

const Page = () => {
  // const bio = use(fetchBio()); //<-- doesn't work!
  const bio = use(bioPromise); //<-- works!
  const [currentBio, setCurrentBio] = useState(bio);
  const ref = useRef();
  const [id, setId] = useState(null);
  useEffect(() => {
    if (ref.current) {
      setId(ref.current.id);
    }
  }, [ref.current]);
  return (
    <>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 1</h2>
        <Example1
          key={currentBio + "1"}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
        />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 2 (useTransition)</h2>
        <Example2
          key={currentBio + "2"}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
        />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 3 (useOptimistic)</h2>
        <Example3
          key={currentBio + "3"}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
        />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 4 (forms)</h2>
        <Example4
          key={currentBio + "4"}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
        />
      </div>
      <div className={"form-container"}>
        <h2>Edit Your Bio Example 5 (forms)</h2>
        <Example5
          key={currentBio + "5"}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
          ref={ref}
        />
        <title>Edit Your Bio!</title>
        <style>{` small { color: blue; } `}</style>
        <small>id = {id}</small>
      </div>
    </>
  );
};
export default Page;
