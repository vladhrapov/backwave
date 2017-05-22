import { firebaseRef } from "../constants/FirebaseConfig";

export function saveSettingsApi(payload) {
  console.log("payload to save: ", payload);
  return firebaseRef
    .ref("settingsCollection")
    .set({ ...payload });
}