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
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import arrow from "../img/arrow.png";
import ethicon from "../img/eth-icon.svg";
import threedots from "../img/three-dots.svg";
import sparkles from "../img/sparkles.png";
import galleryexport from "../img/galleryexport.svg";
import documenttext from "../img/documenttext.svg"
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
    CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST
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
          {chatState === CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST && (
            <div className={styles.frameContainer}>
              <section className={styles.frameSection}>
                <div className={styles.frameDiv}>
                  <div
                    className={styles.ellipseContainer}
                    style={{ margin: "10px 0" }}
                  >
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={user3}
                      style={{ marginBottom: "10px" }}
                    />
                    <div className={styles.sunnndayyyParent}>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                      <div className={styles.xf4844ab5b4fc}>{address}</div>
                    </div>
                  </div>

                  <div
                    className={styles.ellipseContainer}
                    style={{ margin: "10px 0" }}
                  >
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={user3}
                      style={{ marginBottom: "10px" }}
                    />
                    <div className={styles.sunnndayyyParent}>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                      <div className={styles.xf4844ab5b4fc}>{address}</div>
                    </div>
                  </div>

                  <div
                    className={styles.ellipseContainer}
                    style={{ margin: "10px 0" }}
                  >
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={user3}
                      style={{ marginBottom: "10px" }}
                    />
                    <div className={styles.sunnndayyyParent}>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                      <div className={styles.xf4844ab5b4fc}>{address}</div>
                    </div>
                  </div>

                  <div
                    className={styles.ellipseContainer}
                    style={{ margin: "10px 0" }}
                  >
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={user3}
                      style={{ marginBottom: "10px" }}
                    />
                    <div className={styles.sunnndayyyParent}>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                      <div className={styles.xf4844ab5b4fc}>{address}</div>
                    </div>
                  </div>

                  <div
                    className={styles.ellipseContainer}
                    style={{ margin: "10px 0" }}
                  >
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={user3}
                      style={{ marginBottom: "10px" }}
                    />
                    <div className={styles.sunnndayyyParent}>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Gm pickle</div>
                      </h3>
                      <h3 className={styles.gmPickleWrapper}>
                        <div className={styles.gmPickle}>Welcome to Quilt</div>
                      </h3>
                      <div className={styles.xf4844ab5b4fc}>{address}</div>
                    </div>
                  </div>
                </div>
                <div className={communityStyles.frameParent1}>
                {
                    showDropdown && (
                        <div className={communityStyles.uploadMediaDiv}>
                    <div  className={communityStyles.uploadMediaDivTop}>
                      <p>Upload Media</p>
                      <button>
                        <Image
                          className={communityStyles.sparkles}
                          alt=""
                          src={sparkles}
                        />
                        <p>New</p>
                      </button>
                    </div>

                    <div className={communityStyles.uploadMediaDivBottom}>
                      <div  className={communityStyles.uploadMediaDivBottomFirst}>
                        <Image
                          className={styles.ellipseIcon}
                          alt=""
                          src={galleryexport}
                        />
                        <p>Photo & Video</p>
                      </div>

                      <div  className={communityStyles.uploadMediaDivBottomFirst}>
                        <Image
                          className={styles.ellipseIcon}
                          alt=""
                          src={documenttext}
                        />
                        <p>Document</p>
                      </div>
                    </div>
                  </div>
                    )
                }
                  
                  <form className={styles.frameForm}>
                    <Image className={styles.ellipseIcon} alt="" src={user1} />
                    <input type="text" className={styles.frameFormInput} />
                    <button className={styles.iconsaxlinearsend}>
                      <Image className={styles.vectorIcon1} alt="" src={send} />
                    </button>
                  </form>
                  <div className={styles.rightButtonsContainer}>
                    <button
                    onClick={() => setShowDropdown(!showDropdown)}
                      className={communityStyles.communityCardCollapseInput}
                      style={{transition: "0.45s ease",transform: !showDropdown ? `rotate(0)`:`rotate(-45deg)`}}
                    >
                     +   
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
