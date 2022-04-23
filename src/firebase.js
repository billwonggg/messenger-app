import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3EpzbAWUF_BMfkjd0L1fCcKyHtYz_WtM",
  authDomain: "message-space.firebaseapp.com",
  projectId: "message-space",
  storageBucket: "message-space.appspot.com",
  messagingSenderId: "982380231221",
  appId: "1:982380231221:web:b6ee79db1c35bee99f8f7c",
  measurementId: "G-KCSV28CP06",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
