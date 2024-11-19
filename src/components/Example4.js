import React, { useEffect, useOptimistic, useState } from "react";
import { saveBio } from "../Api";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ dirty }) => {
  const formStatus = useFormStatus();
  return (
    <button disabled={formStatus.pending || !dirty}>
      {formStatus.pending ? "saving" : !dirty ? "saved" : "save"}
    </button>
  );
};

const Example4 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [optimisticBio, setOptimisticBio] = useOptimistic(currentBio);
  const [error, setError] = useState(null);
  const dirty = currentBio !== bio;

  // update local state if external state changes
  useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);

  const onSave = async () => {
    setError(false);
    setOptimisticBio(bio); //will automatically switch back if an error is thrown
    try {
      await saveBio(bio);
      setCurrentBio(bio);
    } catch (serverError) {
      setError(serverError.message);
    }
  };
  return (
    <div className={"col"}>
      <form>
        <h3>Current Bio:</h3>
        <p>{optimisticBio ? optimisticBio : <em>your bio is empty</em>}</p>
        <textarea
          onChange={(e) => {
            setBio(e.target.value); // we can't test for pending here ??
          }}
          placeholder="Describe yourself in a few words"
          value={bio}
        >
          {bio}
        </textarea>
        {error && <div className={"form-error"}>{error}</div>}
        <SubmitButton dirty={dirty} />
      </form>
    </div>
  );
};
export default Example4;
/* */
