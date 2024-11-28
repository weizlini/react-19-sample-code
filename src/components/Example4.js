import {useActionState, useOptimistic, useState} from "react";
import { saveBio } from "../Api";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ pristine }) => {
  const formStatus = useFormStatus();
  return (
    <button disabled={formStatus.pending || pristine}>
      {formStatus.pending ? "saving" : pristine ? "saved" : "save"}
    </button>
  );
};

const Example4 = ({ currentBio, setCurrentBio }) => {
  const [bio, setBio] = useState(currentBio);
  const [optimisticBio, setOptimisticBio] = useOptimistic(currentBio);
  const pristine = currentBio === bio;

  const onSave = async () => {
    setOptimisticBio(bio);
    try {
      await saveBio(bio);
      setCurrentBio(bio);
      return null;
    } catch (serverError) {
      return serverError.message;
    }
  };

  const [error, formAction] = useActionState(onSave, null);

  return (
    <form action={formAction}>
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
        <SubmitButton pristine={pristine} />
      </div>
    </form>
  );
};
export default Example4;
