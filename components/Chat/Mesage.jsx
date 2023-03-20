import { TrashIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useRouter } from "next/router";
import ImageViewer from "../shared/imageViewer";
import { Popconfirm, message as masaga } from "antd";
import axios from "axios";
import Image from "next/image";

function Message({ message, own, sropee }) {
  const [more, setMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(true);
  const router = useRouter();
  const [res, setRes] = useState();

  useEffect(() => {
    if (message.text) {
      let string = message.text;
      let count = 0;

      for (let i = 0; i < string.length; i++) {
        if (string.charAt(i)) {
          count++;
        }
      }

      setRes(count);
    }
  }, [message]);

  function cancel(e) {
    console.log(e);
    masaga.success("No biggie");
  }

  const Unsend = async () => {
    try {
      const res = await axios.delete(`/api/chat/messages/${message._id}`);
      if (res.data === "already deleted") {
        masaga.success("Unsent");
      }
    } catch (error) {
      masaga.error("unable to Unsend");
    }
  };

  return (
    <div>
      {message.attachment && open && (
        <ImageViewer open={open} setOpen={setOpen} image={message.attachment} />
      )}
      {}
      {!own && (
        <div ref={sropee} className="py-2 flex space-x-3">
          <div className="flex flex-col items-center cursor-pointer">
            <div>
              {message.profile ? (
                <Image
                  width={50}
                  height={50}
                  alt="profile pic"
                  src={message?.profile}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-purple-400" />
              )}
            </div>
            <div>
              <h1 className="text-xs text-gray-500 ">
                {format(message.createdAt)}
              </h1>
            </div>
          </div>

          <div className="messageText  bg-gray-300 rounded-tr-xl rounded-br-xl rounded-bl-xl">
            <p
              className={`${
                more ? "line-clamp-6" : "line-clamp-none"
              } px-2 py-2 font-mono`}
            >
              {message.text}
            </p>
            {message.attachment && (
              <Image
                width={50}
                height={50}
                alt="profile pic"
                src={message.attachment}
                onClick={() => setOpen(true)}
                className="h-24 hover:border-8 hover:border-blue-400 hover:scale-125 cursor-pointer w-45 object-cover rounded-md"
              />
            )}
          </div>

          {res > 140 && (
            <div>
              {change && more ? (
                <h1
                  onClick={() => setMore(false)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  read more ...
                </h1>
              ) : (
                <h1
                  onClick={() => setMore(true)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  truncate...
                </h1>
              )}
            </div>
          )}
        </div>
      )}

      {own && (
        <div ref={sropee} className="py-2 justify-end flex space-x-3">
          <div className="messageOwn group bg-gray-800 cursor-pointer shadow-md rounded-tl-xl rounded-bl-xl rounded-br-xl">
            <Popconfirm
              title="Are you sure you want to unsend?"
              onConfirm={Unsend}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <TrashIcon className="h-5 w-5 text-blue-500 ml-6 mt-2 hover:text-red-500 hidden group-hover:inline-flex" />
            </Popconfirm>

            <p
              className={` ${
                more ? "line-clamp-6" : "line-clamp-none"
              } px-2 py-2 text-white font-mono`}
            >
              {message.text}
            </p>
            {message.attachment && (
              <Image
                width={50}
                height={50}
                alt="profile pic"
                src={message.attachment}
                onClick={() => setOpen(true)}
                className="h-24 hover:border-8 hover:border-blue-400 hover:scale-125 cursor-pointer w-45 object-cover rounded-md"
              />
            )}
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <div>
              {message.profile ? (
                <Image
                  width={50}
                  height={50}
                  alt="profile pic"
                  src={message?.profile}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-purple-400" />
              )}
            </div>
            <div>
              <h1 className="text-sm text-gray-500 ">
                {format(message.createdAt)}
              </h1>
            </div>
          </div>

          {res > 140 && (
            <div>
              {change && more ? (
                <h1
                  onClick={() => setMore(false)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  read more ...
                </h1>
              ) : (
                <h1
                  onClick={() => setMore(true)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  truncate...
                </h1>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
