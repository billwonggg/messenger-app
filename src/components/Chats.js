import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { firebaseAuth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();
  const logout = async () => {
    await firebaseAuth.signOut();
    history.push("/");
  };
  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">Messenger</div>
        <div className="logout-tab" onClick={logout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="8af4a8f7-0b79-401b-80f6-f134a3ee5819"
        userName="."
        userSecret=""
      />
    </div>
  );
};

export default Chats;
