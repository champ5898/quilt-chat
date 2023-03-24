import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Login from "@/components/Login";
import Loader from "@/components/shared/Loader";
import Nav from "@/components/shared/Nav";
import { useEffect, useRef, useState } from "react";
import profilesData from "../data/profile.json";
import { io } from "socket.io-client";
import { getMessages, getData } from "../fetchdata/groupFetcher";
import Header from "@/components/Header";
import Sidebar from "./Chat/Sidebar";
import Feed from "./Chat/Feed";
import axios from "axios";

export default function Chat() {
  const { user } = useUser();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [joke, setJoke] = useState();
  // const { joke, Loading, Error } = getData(user?.id);
  const [conversations, setConversations] = useState(joke);
  const [ress, setRes] = useState();
  const { register, isLoading, isError } = getMessages(currentChat?._id);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const profiles = profilesData?.profiles;
  const [section, setSection] = useState("");
  const [form, setForm] = useState({ senderId: "", receiverId: "" });

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/api/chat/conversation/" + user?.id);
        setJoke(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [, user, ress]);

  useEffect(() => {
    socket.current = io("https://quilt-chat-1-zb1q.vercel.app/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log("hey");
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users.filter((u) => u.userId !== user.id));
    });
  }, [user]);

  //enable and create the conversation
  const onChat = async (value) => {
    setForm((form.senderId = user.id));
    setForm((form.receiverId = value));

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/chat/conversation/create-conv",
        JSON.stringify(form),
        config
      );
      setRes(response);
      setForm({ senderId: "", receiverId: "" });
      router.replace(router.asPath);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  // search for users to start the conversation with
  const onSearch = async (value) => {
    // setLoad(true);
    let res = value;
    if (value != "" && res != user.email) {
      setOpen(true);

      try {
        const response = profiles.find((u) => u.email === res);

        if (response) {
          onChat(response.id);
        } else {
          console.log("unable to create Chat");
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
        setOpen(false);
      }
    } else {
      console.log("what are you even doing");
      // setLoad(false)
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/chat/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // for sending images to one another
  const handleImage = async (picture) => {
    const message = {
      sender: user.id,
      conversationId: currentChat._id,
      attachment: picture,
      profile: user.profpic,
    };

    try {
      const res = await axios.post("/api/chat/messages", message);

      setMessages([...messages, res.data]);
      console.log(res);
      refreshData();
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // for seding text basically
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.id,
      text: newMessage,
      conversationId: currentChat._id,
      profile: user?.profpic,
    };

    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    const refreshData = () => {
      router.replace(router.asPath);
    };

    try {
      const res = await axios.post("/api/chat/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="bg-gray-900 h-screen overflow-x-hidden overflow-y-scroll"
    >
      <Loader open={open} setOpen={setOpen} />
      <div className="mb-6 mt-0">
        <Nav />
        <Nav />
      </div>
      <div className="relative mt-5">
        <Header
          online={onlineUsers}
          setSection={setSection}
          onSearch={onSearch}
        />
      </div>

      <main className="flex fixed bg-gray-900 h-full w-full">
        <Sidebar
          setRes={setRes}
          data={joke?._id}
          setCurrentChat={setCurrentChat}
          joke={joke}
          conversations={conversations}
          logins={user}
        />

        <div className="flex h-full  w-full px-2 sm:px-7">
          {currentChat ? (
            <Feed
              currentChat={currentChat}
              handleImage={handleImage}
              user={user}
              messages={register ? register : messages}
              handleSubmit={handleSubmit}
              setNewMessage={setNewMessage}
              newMessage={newMessage}
            />
          ) : (
            <span
              className="mt-10 mr-10"
              style={{
                position: "absolute",
                top: "10%",
                fontSize: "50px",
                color: "rgb(224, 220, 220)",
                cursor: "default",
              }}
            >
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </main>
    </div>
  );
}
