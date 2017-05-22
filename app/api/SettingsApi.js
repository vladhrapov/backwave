import { firebaseRef } from "../constants/FirebaseConfig";


export function loadSettingsApi() {
  return firebaseRef.ref("settingsCollection")
    .once("value")
    .then(data => data.val());
}

export function saveSettingsApi(payload) {
  console.log("payload to save: ", payload);
  return firebaseRef.ref("settingsCollection")
    .set({ ...payload });
}