import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { saveBio } from "../Api";

const Example3 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [optimisticBio, setOptimisticBio] = useOptimistic(currentBio);
  const [error, setError] = useState(null);
  const [saving, startTransition] = useTransition();
  const dirty = currentBio !== bio;

  // update local state if external state changes
  useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);

  const onSave = (fail) => {
    startTransition(async () => {
      setError(false);
      setOptimisticBio(bio); //will automatically switch back if an error is thrown
      try {
        await saveBio(bio, fail);
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
          if (!saving) setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
        value={bio}
      >
        {bio}
      </textarea>
      {error && <div className={"form-error"}>{error}</div>}
      <div className={"row"}>
        <button onClick={() => onSave(false)} disabled={saving || !dirty}>
          {saving ? "saving" : saving || !dirty ? "saved" : "save (success)"}
        </button>
        {dirty ? (
          <button onClick={() => onSave(true)} disabled={saving || !dirty}>
            {saving ? "saving" : "save (fail)"}
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Example3;
/* */
