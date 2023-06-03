import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
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
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
import { useRouter } from "next/router";
import { ADD_FRIEND } from "@/graphql/queries";

const Chat = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const Username = userData((state) => state.username);
  const avatar = userData((state) => state.avatar);
  const setUsername = userData((state) => state.setUsername);
  // const chatState = userData((state) => state.currentChatState);
  // const setCurentChatStateToPendingReq =  userData((state) => state.setCurentChatState(CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST))

  const [chatState, setChatState] = useState(
    CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST
  );
  const [showDropdown, setShowDropdown] = useState(false);

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
          console.log("undefined true true");
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
            console.log(e.target.classList);
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
  const [addFriend, { data, loading, error }] = useMutation(ADD_FRIEND, {
    onCompleted: (data) => {
      alert("Request sent!");
      switchChatStateToFriendList();
      console.log(data);
    },
    onError: (error) => {
      console.log(request);
      setRequest(request.toLowerCase());
      alert(error);
    },
  });
  const sendRequest = () => {
    addFriend({ variables: { address: request } });
  };

  const shortenEthAddress = (address) => {
    if (!address) return "Not Connected";
    const firstStr = address.slice(0, 4);
    const lastStr = address.slice(address.length - 4, address.length);
    return firstStr + "...." + lastStr || "";
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
          {!chatState === CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST && (
            <Friendlist
              chatState={chatState}
              placeholder={"Search ens or 0x41c...bd"}
              showCommunity={false}
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
                <button onClick={switchChatStateToPendingFriend}>
                  + {""} Add Friend
                </button>
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
              <div className={styles.frameWrapper}>
                <div className={styles.ellipseParent}>
                  <Image className={styles.frameChild} alt="" src={user2} />
                  <div className={styles.sunnndayyyParent}>
                    <div className={styles.sunnndayyy}>Sunnndayyy</div>
                    <div className={styles.ellipseGroup}>
                      <Image className={styles.ethIcon} alt="" src={ethicon} />
                      <div className={styles.xf4844ab5b4fc}>0xf4844ab5b4fc</div>
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
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>Gm sundayyy</div>
                    </h3>
                  </div>
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>Gm sundayyy</div>
                    </h3>
                  </div>
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>Gm sundayyy</div>
                    </h3>
                  </div>
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>Gm sundayyy</div>
                    </h3>
                  </div>
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.daysAgoGroup}>
                    <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                    <h3 className={styles.gmSundayyyWrapper}>
                      <div className={styles.gmPickle}>Gm sundayyy</div>
                    </h3>
                  </div>
                  <div className={styles.ellipseContainer}>
                    <Image className={styles.frameInner} alt="" src={user3} />
                    <div className={styles.sunnndayyyParent}>
                      <div className={styles.xf4844ab5b4fc}>7 days ago</div>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={styles.frameParent1}>
                  <form className={styles.frameForm}>
                    <Image className={styles.ellipseIcon} alt="" src={user1} />
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
                      <Image
                        // className={styles.vectorIcon3}
                        alt=""
                        src={microphone}
                      />
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
