import { TrashIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import profilesData from "../../data/profile.json";
import axios from "axios";
import { useRouter } from "next/router";
import { Popconfirm, message } from "antd";
import Image from "next/image";

const profiles = profilesData?.profiles;
function SidebarRow({
  conversation,
  conversations,
  setCurrentChat,
  joke,
  setRes,
  currentUser,
  data,
}) {
  const friendId = conversation.members.find((m) => m !== currentUser.id);
  const [user, setUser] = useState(null);
  const router = useRouter();

  console.log("conversation", conversation);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = profiles.find((u) => u.id === friendId);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [joke]);

  const deleteConv = async () => {
    try {
      const response = await axios.delete(
        `/api/chat/conversation/${conversation?._id}`
      );
      message.success("deleted conversation successfully");
      setCurrentChat(null);
      setRes("deleted");
      router.replace(router.asPath);
    } catch (err) {
      message.error("Can't delete conversation at this time");
    }
  };

  function cancel(e) {
    console.log(e);
    message.success("No biggie");
  }

  return (
    <div className="flex cursor-pointer group border-b  py-2 sm:px-3 sm:space-x-7">
      <div className="flex items-center  space-x-3">
        <div>
          {user?.profpic ? (
            <div>
              <Image
                src={user?.profpic}
                width={100}
                height={100}
                alt="profile pic"
                className="h-6 w-full sm:h-8 sm:w-8  rounded-full object-cover group-hover:animate-bounce"
              />
            </div>
          ) : (
            <UserCircleIcon className="h-8 text-blue-500 w-8 rounded-full group-hover:animate-bounce" />
          )}
        </div>

        <div className=" flex-col ">
          <h1 className="sm:text-base text-xs font-medium group-hover:text-blue-500 sm:inline-flex">
            {user?.name}
          </h1>
          {/* <h1 className="text-gray-500 text-sm hidden sm:inline-flex">
            {" "}
            the recent chat
          </h1> */}
        </div>
      </div>

      <div>
        <Popconfirm
          title="Are you sure you want to delete Conversation?"
          onConfirm={deleteConv}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <TrashIcon className="h-5 w-5 text-blue-500 ml-6 mt-2 hover:text-red-500 inline-flex sm:hidden group-hover:inline-flex" />
        </Popconfirm>
      </div>
    </div>
  );
}

export default SidebarRow;
