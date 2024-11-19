import localForage from "localforage";

// fake API using localForage and delay to simulate a round trip to the server
/**
 * simulates a call to fetch a string from the server
 * @returns {Promise<{code: number, message: string}|string>}
 */
export async function fetchBio() {
  await delay(1000); // simulate a call to the server
  return await localForage.getItem("bio");
}

export async function ssFetchBio() {
  await delay(1000); // simulate a call to the server
  return localForage.getItem("bio");
}
/**
 * simulates a call to the server to save the bio
 * @param bio the text to save
 * @param fail set to truthy to force a failure
 * @returns {Promise<{code: number, message: string}|boolean>}
 */
export async function saveBio(bio, fail = false) {
  await delay(2000);
  if (fail) {
    throw new Error("unable to save bio");
  } else {
    try {
      await localForage.setItem("bio", bio);
      return false;
    } catch {
      throw new Error("unable to save bio");
    }
  }
}

/**
 * simulates a server side delay
 * @param ms
 * @returns {Promise<unknown>}
 */
function delay(ms) {
  console.log("simulated server call");
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("done fake server call");
      resolve();
    }, ms),
  );
}
