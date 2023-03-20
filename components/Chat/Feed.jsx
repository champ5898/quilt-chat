import { useEffect, useRef, useState } from "react";
import Chatinput from "./Chatinput";
import Message from "./Mesage";
import profiledata from "../../data/profile.json";

const profiles = profiledata?.profiles;

function Feed({
  handleSubmit,
  handleImage,
  setNewMessage,
  newMessage,
  currentChat,
  messages,
  user,
}) {
  const scrollRef = useRef();
  const [userr, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const j = currentChat?.members.find((u) => u != user?.id);
      const findUser = profiles.find((u) => u.id === j);
      setUser(findUser);
    };
    getUser();
  }, [, currentChat]);

  useEffect(() => {
    const scrollToBottom = async () => {
      await scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div className=" w-full h-5/6   px-2  scrollbar-hide rounded-lg overflow-y-auto bg-gray-100 shadow-md">
      <main className="h-5/6 py-5 px-3 overflow-y-scroll w-full scrollbar-hide md:scrollbar-default">
        <div className="flex space-x-2 items-center">
          <div>connected to {userr?.name}</div>
          <div className="h-3 w-3 bg-blue-500 rounded-full" />
        </div>

        {messages.map((m) => (
          <div key={m._id}>
            <div ref={scrollRef} className="">
              <Message message={m} user={user} own={m.sender === user.id} />
            </div>
          </div>
        ))}
      </main>

      <footer className="">
        <Chatinput
          handleImage={handleImage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSubmit={handleSubmit}
        />
      </footer>
    </div>
  );
}
export default Feed;
