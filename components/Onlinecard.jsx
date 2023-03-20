import axios from "axios";
import { useEffect, useState } from "react";
import profileData from "../data/profile.json"
import Image from "next/image";

let profiles = profileData?.profiles
function Onlinecard({ user }) {
  const [userr, setUser] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = profiles.find((u) => u.id === user);
        setUser(res)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className="flex justify-between items-center border-t-2 shadow-md px-4 py-4">
      <div className="flex items-center cursor-pointer">
        <Image
          width={50}
          height={50}
          alt="profile pic"
          src={
            userr.profpic
              ? userr.profpic
              : `https://images.unsplash.com/photo-1643083946374-bfbca55d9222?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60`
          }
          className="h-20 w-20 rounded-full object-cover scale-50"
        />
        <div className="h-4 w-4 rounded-full bg-blue-700 " />
      </div>

      <div className="flex items-center space-x-3">
        <h1>{userr?.name}</h1>
      </div>

      <h1>{userr?.city} </h1>
    </div>
  );
}

export default Onlinecard;
