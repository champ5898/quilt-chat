import {
  ArrowNarrowUpIcon,
  ArrowUpIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import {
  AdjustmentsIcon,
  ChevronDoubleRightIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { Send } from "@mui/icons-material";
import { useState } from "react";
import Sendmodal from "./Sendmodal";

function Chatinput({ newMessage, setNewMessage, handleSubmit, handleImage }) {
  const [image, setImage] = useState("");
  const [imagee, setImagee] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" flex flex-col justify-end h-full w-full py-3">
      <div className="  flex sm:px-4 items-center w-full space-x-3">
        {showModal && (
          <Sendmodal
            setShowModal={setShowModal}
            handleImage={handleImage}
            image={image}
            imagee={imagee}
          />
        )}

        <div
          // style={{ backgroundColor: "red" }}

          style={{ backgroundColor: "rgb(35,37,46)" }}
          className=" w-full  rounded-l-full rounded-r-full items-center h-14 bg-gray-300 px-2 flex justify-between"
        >
          <div className="flex h-full space-x-3 w-full">
            <label>
              <UploadIcon
                File
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                }}
                className="h-10 text-gray-500 hover:text-white  cursor-pointer"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setImagee(event.target.files[0]);
                  setImage(URL.createObjectURL(event.target.files[0]));
                  setShowModal(true);
                }}
                className="invisible w-5"
              />
            </label>

            <div className="w-full h-full">
              <textarea
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                style={{
                  border: "none",
                  width: "101%",
                  backgroundColor: "rgb(35,37,46)",
                  color: "white",
                }}
                className=" px-2 py-1 pt-4  h-full rounded-md"
                placeholder="Type a Message"
              />
            </div>
          </div>

          {/* <div>
            <AdjustmentsIcon className="h-5 w-5 cursor-pointer" />
          </div> */}
        </div>

        <div className="cursor-pointer" onClick={handleSubmit}>
          <Send
            style={{
              color: "white",
              fontSize: "2rem",
              borderRadius: 10,
            }}
            //  className="bg-green-400 rounded-full px-4 py-4 text-white h-14 w-14"
          />
        </div>
      </div>
    </div>
  );
}

export default Chatinput;
