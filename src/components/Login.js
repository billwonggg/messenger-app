import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { firebaseAuth } from "../firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Message Space</h2>
        <div
          className="login-button google"
          onClick={() =>
            signInWithRedirect(firebaseAuth, new GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> &nbsp;Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
