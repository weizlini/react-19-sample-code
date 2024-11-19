import React, { useEffect, useState } from "react";
import { saveBio } from "../Api";

const Example1 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const dirty = currentBio !== bio;
  // update local state if external state changes
  useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);
  const onSave = async () => {
    setError(false);
    setSaving(true);
    try {
      await saveBio(bio, false);
      setCurrentBio(bio);
    } catch (serverError) {
      setError(serverError.message);
    }
    setSaving(false);
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
export default Example1;
