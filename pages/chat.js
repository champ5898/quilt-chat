import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { userData } from "../context/userData";
import { Msg } from "@/context/msg";
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
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
import { useRouter } from "next/router";
import { ADD_FRIEND } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_PROFILE,
  UPDATE_EMAIL,
  GET_PROFILE_BYADDRESS,
  UPDATE_USERNAME,
} from "../graphql/queries";
const Chat = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const Username = userData((state) => state.username);
  const avatar = userData((state) => state.avatar);
  const setUsername = userData((state) => state.setUsername);
  // const chatState = userData((state) => state.currentChatState);
  // const setCurentChatStateToPendingReq =  userData((state) => state.setCurentChatState(CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST))

  const [chatState, setChatState] = useState(
    CHAT_PAGE_CONTROLS.SHOW_ENCRYPTION_MSG
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentFriendData, setCurrentFriendData] = useState({
    username: "",
    address: "",
    profilePic: "",
  });

  const pageRef = useRef();
  const [request, setRequest] = useState("");
  const logout = userData((state) => state.logout);
  const router = useRouter();
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  useEffect(() => {
    const ref = pageRef.current;

    if (ref) {
      ref.addEventListener("click", (e) => {
        if (e.target.classList === undefined) {
          // console.log('undefined true true')
          return;
        } else if (
          !e.target.classList.contains("chat_dropdownHeader__epkvx") &&
          !e.target.classList.contains("chat_ellipseParentDropdown___Tc0S") &&
          !e.target.classList.contains("chat_dropdownRenameRight__UMW5t") &&
          !e.target.classList.contains("chat_sunnndayyy__YoMnd") &&
          !e.target.classList.contains("") &&
          !e.target.classList.contains(
            "chat_dropdownPaymentDivContainer__G7ozf"
          ) &&
          !e.target.classList.contains("hat_frameChild__3Ny_b") &&
          !e.target.classList.contains("chat_sunnndayyyParent__d1sOy") &&
          !e.target.classList.contains("chat_chatDropdownMain__ThZR") &&
          !e.target.classList.contains(
            "chat_dropdownPaymentDivContainer__G7ozf"
          ) &&
          !e.target.classList.contains("chat_frameChildSmall__DZgXa")
        ) {
          if (e.target.classList.length == 0) {
            return;
          } else {
            setShowDropdown(false);
            // console.log(e.target.classList);
          }
        }
      });
    }
  });

  const switchChatStateToPendingFriend = () => {
    // setCurentChatStateToPendingReq()
    setChatState(CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST);
  };
  const switchChatStateToFriendList = () => {
    // setCurentChatStateToPendingReq()
    setChatState(CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST);
  };
  const switchToEncryptionMessage = () => {
    setChatState(CHAT_PAGE_CONTROLS.SHOW_ENCRYPTION_MSG);
  };

  const shortenEthAddress = (address) => {
    if (!address) return "Not Connected";
    const firstStr = address.slice(0, 4);
    const lastStr = address.slice(address.length - 4, address.length);
    return firstStr + "...." + lastStr || "";
  };
  const [addFriend, { data, loading, error }] = useMutation(ADD_FRIEND, {
    onCompleted: (data) => {
      alert("Request sent!");
      switchChatStateToFriendList();
      // console.log(data);
    },
    onError: (error) => {
      // console.log(error);
    },
  });
  const sendRequest = () => {
    addFriend({ variables: { address: request } });
  };

  let friendData = [];
  const friends = userData((state) => state.friends);

  friends.forEach((element) => {
    const { loading, error, data } = useQuery(GET_PROFILE_BYADDRESS, {
      variables: { address: element },
    });

    const setFriends = async () => {
      try {
        const friend = {
          address: element,
          username: await data.getProfileByAddress.username,
          profilePic: (await data.getProfileByAddress.profilePicture) ?? img,
        };
        // console.log("friendData");
        friendData.push(friend);
      } catch (error) {
        // console.log(error);
      }
    };
    setFriends();
    // console.log(friendData);
  });

  const updateCurrentUserOnDashboard = (friend) => {
    // console.log("friend item");
    // console.log(friend);
    setCurrentFriendData(friend);
  };
  return (
    <div className={styles.chat} ref={pageRef}>
      <Sidebar
        switchChatStateToFriendList={switchChatStateToFriendList}
        switchToEncryptionMessage={switchToEncryptionMessage}
        switchChatStateToPendingFriend={switchChatStateToPendingFriend}
      />
      <div className={styles.chatRightContainer}>
        <div className={styles.quiltNewLogo8dc214cbfb2f936Parent}>
          <button
            className={styles.profileEthCard}
            data-animate-on-scroll
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <div className={styles.x4c99923bdParent}>
              <div className={styles.x4c99923bd}>
                {shortenEthAddress(address) || address}
              </div>
              <div className={styles.ethereum}>{network}</div>
            </div>
            <Image className={styles.vectorIcon} alt="" src={arrow} />
          </button>
        </div>

        <div className={styles.friendListContainer}>
          {chatState === CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST && (
            <PendingRequest />
          )}
          {(chatState === CHAT_PAGE_CONTROLS.SHOW_ENCRYPTION_MSG ||
            chatState === CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST) && (
            <Friendlist
              chatState={chatState}
              placeholder={"Search ens or 0x41c...bd"}
              showCommunity={true}
              switchChatStateToFriendList={switchChatStateToFriendList}
              updateCurrentUserOnDashboard={updateCurrentUserOnDashboard}
            />
          )}
          {chatState === CHAT_PAGE_CONTROLS.SHOW_ENCRYPTION_MSG && (
            <div className={pendingStyles.padlockMainContainer}>
              <div className={pendingStyles.frameContainerPadlock}>
                <div className={pendingStyles.framePadlockDiv}>
                  <Image className={styles.padlock} alt="" src={padlock} />
                  <p>
                    You can only send request to the user registered on this
                    platform
                  </p>
                </div>
              </div>
            </div>
          )}
          {chatState === CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST && (
            <div className={pendingStyles.frameContainer}>
              <h2>Add friends</h2>
              <p className={pendingStyles.frameChildP}>
                You can add a friend with their wallet address
              </p>
              <div className={pendingStyles.sendRequestDiv}>
                <input
                  type="text"
                  onChange={(e) => {
                    setRequest(e.target.value);
                  }}
                  placeholder="Name, address, eth or ad"
                />
                <button
                  onClick={() => {
                    sendRequest();
                  }}
                >
                  Send friend request
                </button>
              </div>
            </div>
          )}
          {chatState === CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST && (
            <div className={styles.frameContainer}>
              <Msg
                clickedAddress={currentFriendData.address}
                profilePic={currentFriendData.profilePic}
                username={currentFriendData.username}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
