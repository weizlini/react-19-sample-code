import { useId, useState } from "react";
import { saveBio } from "../Api";

const Example5 = ({ currentBio, setCurrentBio, ref }) => {
  const [bio, setBio] = useState(currentBio);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const pristine = currentBio === bio;
  const id = useId();

  const onSave = async () => {
    setError(false);
    setPending(true);
    try {
      await saveBio(bio);
      setCurrentBio(bio);
    } catch (serverError) {
      setError(serverError.message);
    }
    setPending(false);
  };

  return (
    <div className={"col"}>
      <h3>Current Bio:</h3>
      <p>{currentBio ? currentBio : <em>your bio is empty</em>}</p>
      <textarea
        id={id}
        onChange={(e) => {
          setBio(e.target.value);
        }}
        placeholder="Describe yourself in a few words"
        value={bio}
        ref={ref}
      />
      {error && <div className={"form-error"}>{error}</div>}
      <button onClick={onSave} disabled={pending || pristine}>
        {pending ? "saving" : pristine ? "saved" : "save"}
      </button>
    </div>
  );
};
export default Example5;
