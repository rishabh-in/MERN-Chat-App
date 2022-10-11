import React, { useEffect, useState } from "react";
import axios from "axios";

export const ChatPage = () => {
  let [chat, setChat] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chats");
    setChat(data);
    console.log(data);
  };
  console.log(chat);
  return <div></div>;
};
