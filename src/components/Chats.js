import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { firebaseAuth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import FormData from "form-data";
import Loading from "./Loading";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await firebaseAuth.signOut();
    history.push("/");
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      })
      .then((_) => {
        // user already exists
        setLoading(false);
      })
      .catch((_) => {
        // user doesn't exist, create new user
        let form = new FormData();
        form.append("email", user.email);
        form.append("username", user.email);
        form.append("secret", user.uid);
        const config = {
          method: "post",
          url: "https://api.chatengine.io/users/",
          headers: {
            "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY,
          },
          data: form,
        };
        axios(config)
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  }, [user, history]);

  return !user || loading ? (
    <Loading />
  ) : (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Message Space</div>
        <div className="logout-tab" onClick={() => logout()}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 60px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        offset={10}
      />
    </div>
  );
};

export default Chats;
