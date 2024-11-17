import localForage from "localforage";

// fake API using localForage and delay to simulate a round trip to the server
/**
 * simulates a call to fetch a string from the server
 * @returns {Promise<{code: number, message: string}|string>}
 */
export async function fetchBio() {
  await delay(1000); // simulate a call to the server
  try {
    let bio = localForage.getItem("bio");
    return String(bio);
  } catch {
    return {
      code: 1,
      message: "unable to get bio",
    };
  }
}

/**
 * simulates a call to the server to save the bio
 * @param bio the text to save
 * @param fail set to truthy to force a failure
 * @returns {Promise<{code: number, message: string}|boolean>}
 */
export async function saveBio(bio, fail = false) {
  await delay(1000);
  if (fail) {
    return {
      code: 1,
      message: "unable to save bio",
    };
  } else {
    try {
      await localForage.setItem("bio", bio);
      return false;
    } catch {
      return {
        code: 1,
        message: "unable to save bio",
      };
    }
  }
}

/**
 * simulates a server side delay
 * @param ms
 * @returns {Promise<unknown>}
 */
function delay(ms) {
  return new Promise((resolve) => (resolve, ms));
}
