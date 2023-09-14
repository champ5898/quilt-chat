import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
  gql,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { userData } from "../context/userData";
import Friendlist from "../components/friendlist";
import Sidebar from "../components/sidebar";
import styles from "../styles/chat.module.css";
import pendingStyles from "../styles/pendingrequest.module.css";
import padlock from "../img/padlock.svg";
import send from "../img/send.png";
import microphone from "../img/microphone.png";
import file from "../img/file.png";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import arrow from "../img/arrow.png";
import ethicon from "../img/eth-icon.svg";
import threedots from "../img/three-dots.svg";
import PendingRequest from "@/components/pendingrequest";
import ChatProfileCard from "../fragments/ChatProfileCard";
import { GET_P2P_MESSAGEFEED, SEND_P2P_MESSAGE } from "@/graphql/queries";

const shortenEthAddress = (address) => {
  if (!address) return "Not Connected";
  const firstStr = address.slice(0, 4);
  const lastStr = address.slice(address.length - 4, address.length);
  return firstStr + "...." + lastStr || "";
};
export const Msg = ({
  clickedAddress,
  profilePic,
  username,
  setShowDropdown,
  showDropdown,
}) => {
  const [sendP2pMessage] = useMutation(SEND_P2P_MESSAGE, {
    onCompleted: (data) => {
      console.log("MESSAGE SENT");
      console.log(data);
      setInputMessage('')
    },
    onError: (error) => {
      console.error(error);
      setInputMessage('')
    },
  });
  const [inputMessage, setInputMessage] = useState("");
  const sendMessage = () => {
    // console.log(inputMessage)
    const data = {
      receiverAddress: clickedAddress,
      messageType: "message",
      messageData: { contentType: "text", content: inputMessage },
      sentAt: new Date().toISOString(),
    };

    sendP2pMessage({
      variables: { data: data },
    });
  };

  const { loading, error, data } = useQuery(GET_P2P_MESSAGEFEED, {
    variables: { receiverAddress: clickedAddress },
    pollInterval: 1000,
  });
  console.log('testing messages')
  console.log(data);
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      <div className={styles.frameWrapper}>
        <div className={styles.ellipseParent}>
          <Image
            className={styles.frameChild}
            alt=""
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
            src={profilePic || user2}
          />
          <div className={styles.sunnndayyyParent}>
            <div className={styles.sunnndayyy}>{username}</div>
            <div className={styles.ellipseGroup}>
              {/* <Image className={styles.ethIcon} alt="" src={profilePic} width={35} height={35} /> */}
              {/* <div className={styles.xf4844ab5b4fc}>
                {shortenEthAddress(clickedAddress || "")}
              </div> */}
              <div className={styles.xf4844ab5b4fc}>{clickedAddress || ""}</div>
            </div>
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <Image
            className={styles.threedots}
            alt=""
            src={threedots}
            onClick={() => setShowDropdown(true)}
          />

          {showDropdown && (
            <ChatProfileCard setShowDropdown={setShowDropdown} />
          )}
        </div>
      </div>
      <section className={styles.frameSection}>
        <div className={styles.frameDiv}>
          {data &&
            data.getP2pMessageFeed.map((feed) => {
              if (feed.senderAddress !== clickedAddress) {
                return (
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>{feed.messageData.content}</div>
                    </h3>
                  </div>
                );
              } else {
                return (
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}> </div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>{feed.messageData.content}</div>
                      </h3>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className={styles.frameParent1}>
          <form className={styles.frameForm}>
            <Image
              className={styles.ellipseIcon}
              alt=""
              width={80}
              height={80}
              style={{ borderRadius: "50%" }}
              src={profilePic || user2}
            />
            <input
              type="text"
              className={styles.frameFormInput}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className={styles.iconsaxlinearsend}
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Image className={styles.vectorIcon1} alt="" src={send} />
            </button>
          </form>
          <div className={styles.rightButtonsContainer}>
            <button className={styles.vectorWrapper}>
              <Image className={styles.vectorIcon2} alt="" src={file} />
            </button>
            <button className={styles.iconsaxlinearmicrophone2}>
              <Image alt="" src={microphone} />
            </button>
          </div>
          {/* ======= */}
        </div>
        {/* <div className={styles.frameParent1}>
                <form className={styles.frameForm}>
                  <Image
                    className={styles.ellipseIcon}
                    alt=""
                    src={avatar}
                    width={5}
                    height={5}
                  />
                  <input type="text" className={styles.frameFormInput} />
                  <button className={styles.iconsaxlinearsend}>
                    <Image className={styles.vectorIcon1} alt="" src={send} />
                  </button>
                </form>
                <div className={styles.rightButtonsContainer}>
                  <button className={styles.vectorWrapper}>
                    <Image className={styles.vectorIcon2} alt="" src={file} />
                  </button>
                  <button className={styles.iconsaxlinearmicrophone2}>
=======
                <div className={styles.frameParent1}>
                  <form className={styles.frameForm}>
>>>>>>> 6938ae2b0979dda0f14378727227773890849cd8
                    <Image
                      className={styles.ellipseIcon}
                      alt=""
                      src={avatar}
                      width={5}
                      height={5}
                    />
                  </button> 
                </div>
                </div> */}
        {/* <input type="text" className={styles.frameFormInput} />
                    <button className={styles.iconsaxlinearsend}>
                      <Image className={styles.vectorIcon1} alt="" src={send} />
                    </button>
                  </form> */}
        {/* <div className={styles.rightButtonsContainer}>
                    <button className={styles.vectorWrapper}>
                      <Image className={styles.vectorIcon2} alt="" src={file} />
                    </button>
                    <button className={styles.iconsaxlinearmicrophone2}>
                      <Image
                        // className={styles.vectorIcon3}
                        alt=""
                        src={microphone}
                      />
                    </button>
                  </div>
                </div> */}
      </section>
    </>
  );
};
