import { useState, useTransition } from "react";
import { saveBio } from "../Api";

const Example2 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition(); //<-- removed useState for pending
  const pristine = currentBio === bio;

  const onSave = () => {
    startTransition(async () => {
      setError(false);
      try {
        await saveBio(bio, false);
        setCurrentBio(bio);
      } catch (serverError) {
        setError(serverError.message);
      }
    });
  };
  return (
    <div className={"col"}>
      <h3>Current Bio:</h3>
      <p>{currentBio ? currentBio : <em>your bio is empty</em>}</p>
      <textarea
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
        value={bio}
      />
      {error && <div className={"form-error"}>{error}</div>}
      <button onClick={onSave} disabled={pending || pristine}>
        {pending ? "saving" : pristine ? "saved" : "save"}
      </button>
    </div>
  );
};
export default Example2;
/* */
