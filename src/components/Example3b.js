import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { saveBio } from "../Api";

const Example3b = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [optimisticBio, setOptimisticBio] = useOptimistic(currentBio);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();
  const pristine = currentBio === bio;

  // update local state if props change after mounting
  useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);

  const onSave = () => {
    startTransition(async () => {
      setError(false);
      setOptimisticBio(bio); //will automatically switch back if an error is thrown
      try {
        await saveBio(bio);
        setCurrentBio(bio);
      } catch (serverError) {
        setError(serverError.message);
      }
    });
  };
  return (
    <div className={"col"}>
      <h3>Current Bio:</h3>
      <p>{optimisticBio ? optimisticBio : <em>your bio is empty</em>}</p>
      <textarea
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
        value={bio}
      />
      {error && <div className={"form-error"}>{error}</div>}
      <div className={"row"}>
        <button onClick={() => onSave(false)} disabled={pending || pristine}>
          {pending ? "pending" : pending || pristine ? "saved" : "save"}
        </button>
      </div>
    </div>
  );
};
export default Example3b;
/* */
