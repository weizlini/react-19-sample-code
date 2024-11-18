import React, { useState, useTransition } from "react";
import { saveBio } from "../Api";

const Example2 = () => {
  const [bio, setBio] = useState("");
  const [savedBio, setSavedBio] = useState(bio);
  const [error, setError] = useState(null);
  const [saving, startTransition] = useTransition(); //<-- removed useState for saving
  const dirty = savedBio !== bio;
  const onSave = () => {
    startTransition(async () => {
      setError(false);
      try {
        await saveBio(bio, true);
        setSavedBio(bio);
      } catch (serverError) {
        setError(serverError.message);
      }
    });
  };
  return (
    <div className={"col"}>
      <h3>Current Bio:</h3>
      <p>{savedBio}</p>
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
