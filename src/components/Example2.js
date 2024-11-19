import React, { useEffect, useState, useTransition } from "react";
import { saveBio } from "../Api";

const Example2 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [error, setError] = useState(null);
  const [saving, startTransition] = useTransition(); //<-- removed useState for saving
  const dirty = currentBio !== bio;
  // update local state if external state changes
  useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);
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
          if (!saving) setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
        value={bio}
      >
        {bio}
      </textarea>
      {error && <div className={"form-error"}>{error}</div>}
      <button onClick={onSave} disabled={saving || !dirty}>
        {saving ? "saving" : !dirty ? "saved" : "save"}
      </button>
    </div>
  );
};
export default Example2;
/* */
