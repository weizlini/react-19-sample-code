import React, { useOptimistic, useState, useTransition } from "react";
import { saveBio } from "../Api";

const Example2 = () => {
  const [bio, setBio] = useState("");
  const [savedBio, setSavedBio] = useOptimistic(bio); //<-- useOptimistic instead of useState
  const [error, setError] = useState(null);
  const [saving, startTransition] = useTransition();
  const dirty = savedBio !== bio;
  const onSave = () => {
    startTransition(async () => {
      setError(false);
      setSavedBio(bio); //will automatically switch back if an error is thrown ?
      try {
        await saveBio(bio);
      } catch (serverError) {
        setError(serverError.message);
      }
    });
  };
  return (
    <div className={"col"}>
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
