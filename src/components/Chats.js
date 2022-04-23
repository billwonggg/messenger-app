import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { firebaseAuth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await firebaseAuth.signOut();
    history.push("/");
  };

  const getImage = async (url) => {
    try {
      const resp = await fetch(url, {
        mode: "no-cors",
      });
      if (resp.statusCode === 200) {
        const data = await resp.blob();
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "8af4a8f7-0b79-401b-80f6-f134a3ee5819",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        // user already exists
        setLoading(false);
      })
      .catch(() => {
        // no user found
        // make new user
        let form = new FormData();
        form.append("email", user.email);
        form.append("username", user.email);
        form.append("secret", user.uid);
        getImage(user.photoURL)
          .then((avatar) => {
            form.append("avatar", avatar, avatar.name);
            console.log(form);
            axios
              .post("https://api.chatengine.io/users/", {
                form,
                headers: {
                  "private-key": "845a7cf7-5334-4b9f-bcc2-4fd3a22d3c82",
                },
              })
              .then(() => {
                setLoading(false);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Messenger</div>
        <div className="logout-tab" onClick={() => logout()}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="8af4a8f7-0b79-401b-80f6-f134a3ee5819"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
