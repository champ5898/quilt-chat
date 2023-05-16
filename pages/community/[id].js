import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { userData } from "../../context/userData";
import Friendlist from "../../components/friendlist";
import Sidebar from "../../components/sidebar";
import styles from "../../styles/chat.module.css";
import communityStyles from "../../styles/community.module.css";
import pendingStyles from "../../styles/pendingrequest.module.css";
import padlock from "../../img/padlock.svg";
import usercommunity from "../../img/usercommunity.svg";
import infocircle from "../../img/infocircle.svg";
import verify from "../../img/verify.svg";
import arrow from "../../img/arrow.png";
import PendingRequest from "@/components/pendingrequest";
import {
  CHAT_PAGE_CONTROLS,
  ACTIVE_SIDEBAR_STATES,
} from "../../constants/chat";
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
  const [communities, setCommunities] = useState([{}, {}, {}]);

  const pageRef = useRef();
  const [request, setRequest] = useState("");
  const logout = userData((state) => state.logout);
  const router = useRouter();

  console.log("communities,", communities);
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

  return (
    <div className={styles.chat} ref={pageRef}>
      <Sidebar
        switchChatStateToFriendList={switchChatStateToFriendList}
        activeState={ACTIVE_SIDEBAR_STATES.COMMUNITY}
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
              <div className={styles.x4c99923bd}>{address}</div>
              <div className={styles.ethereum}>{network}</div>
            </div>
            <Image className={styles.vectorIcon} alt="" src={arrow} />
          </button>
        </div>

        <div className={styles.friendListContainer}>
          {chatState === CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST && (
            <PendingRequest />
          )}

          <Friendlist chatState={chatState} />
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
                <div className={communityStyles.communityPictureDiv}>
                  <Image
                    className={styles.communityUser}
                    alt=""
                    src={usercommunity}
                  />
                  <div className={communityStyles.communityCardLine} />
                </div>

                <div>
                  <div>
                    <p>Uniswap Labs</p>
                    <Image alt="" src={verify} />
                  </div>
                  <button>Join</button>
                </div>
                <p>
                  Forgotten Runes is the world’s most robust decentralised
                  franchise. Our media ecosystem is comprised of animation
                  physical comic books, and a suite of video games. At core of
                  these media expressions are our character and our characters
                  are owned by our token holders.
                </p>
                <div>
                  <p>Requirement</p>
                  <div>
                    <Image alt="" src={infocircle} />

                    <p>Hold at least 1 UNI to join the community</p>
                  </div>
                </div>

                <div>
                  <div>
                    <div>
                      <p>Members</p>
                      <p>60</p>
                    </div>
                    <div>-</div>
                  </div>
                  <div>
                  <div  >
                  <Image
                    className={styles.communityUser}
                    alt=""
                    src={usercommunity}
                  />
                  <p>Westwood</p>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
