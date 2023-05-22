import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { userData } from "../context/userData";
import Friendlist from "../components/friendlist";
import Sidebar from "../components/sidebar";
import styles from "../styles/chat.module.css";
import communityStyles from "../styles/community.module.css";
import pendingStyles from "../styles/pendingrequest.module.css";
import padlock from "../img/padlock.svg";
import send from "../img/send.png";
import microphone from "../img/microphone.png";
import file from "../img/file.png";
import usercommunity from "../img/usercommunity.svg";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import arrow from "../img/arrow.png";
import ethicon from "../img/eth-icon.svg";
import threedots from "../img/three-dots.svg";
import PendingRequest from "@/components/pendingrequest"; 
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
import { useRouter } from "next/router";
import { ADD_FRIEND } from "@/graphql/queries";

const Chat = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  // const chatState = userData((state) => state.currentChatState);
  // const setCurentChatStateToPendingReq =  userData((state) => state.setCurentChatState(CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST))

  const [chatState, setChatState] = useState(
    CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST
  );
  const [communities, setCommunities] = useState([{id: 4},{id: 5},{id:6}]);

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
  const [addFriend, { data, loading, error }] = useMutation(ADD_FRIEND, {
    onCompleted: (data) => {
      alert("Request sent!");
      switchChatStateToFriendList();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const sendRequest = () => {
    addFriend({ variables: { address: request } });
  };

  const switchToEncryptionMessage = () => {
    setChatState(CHAT_PAGE_CONTROLS.SHOW_ENCRYPTION_MSG);
  }
  const shortenEthAddress = (address) => {  
    if (!address)  return "Not Connected"; 
       const firstStr = address.slice(0,4);
   const lastStr = address.slice(address.length - 4, address.length)
   return firstStr + "...." + lastStr || "";
    
 }
  return (
    <div className={styles.chat} ref={pageRef}>
      <Sidebar switchChatStateToFriendList={switchChatStateToFriendList} switchToEncryptionMessage={switchToEncryptionMessage} switchChatStateToPendingFriend={switchChatStateToPendingFriend} />
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
            <div className={styles.x4c99923bd}>{shortenEthAddress(address) || address}</div>

              <div className={styles.ethereum}>{network}</div>
            </div>
            <Image className={styles.vectorIcon} alt="" src={arrow} />
          </button>
        </div>

        <div className={styles.friendListContainer}>
          {chatState === CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST && (
            <PendingRequest />
          )}

          <Friendlist chatState={chatState} placeholder={"Find a community"} />
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
      
            <div className={styles.frameContainer}>
              <div className={communityStyles.frameCommunitiesWrapper}>
                <h2>Suggested Communities</h2>

                <div className={communityStyles.communitiesContainer}>
                 {
                  communities && communities.map((community, idx) => {
                    return (
                      <div className={communityStyles.communtyContainerCard} key={idx} onClick={() => router.push("/community/"+community.id)}>
                    <div className={communityStyles.communityPictureDiv}>
                      <Image
                        className={styles.communityUser}
                        alt=""
                        src={usercommunity}
                      />
                      <div className={communityStyles.communityCardLine} />
                    </div>

                    <div className={communityStyles.cardInfoDiv}>
                      <p>Uniswap Labs</p>
                      <p className={communityStyles.cardInfoP}>
                        a protocol for trading and automated liquidity provision
                        on Ethereum.
                      </p>
                      <div className={communityStyles.cardInfoButtonDiv}>
                        <button>Join</button>
                        <button>Explore</button>
                      </div>
                    </div>
                  </div>
                    )
                  })
                 }
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Chat;
