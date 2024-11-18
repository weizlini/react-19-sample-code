import React, { useState } from "react";
import { saveBio } from "../Api";

const Example1 = () => {
  const [bio, setBio] = useState(null);
  const [savedBio, setSavedBio] = useState(bio);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const dirty = savedBio !== bio;

  const onSave = async () => {
    setError(false);
    setSaving(true);
    try {
      await saveBio(bio, false);
      setSavedBio(bio);
    } catch (serverError) {
      setError(serverError.message);
    }
    setSaving(false);
  };

  return (
    <div className={"col"}>
      <h3>Current Bio:</h3>
      <p>{savedBio ? savedBio : <em>your bio is empty</em>}</p>
      <textarea
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
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
