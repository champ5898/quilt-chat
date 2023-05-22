import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { userData } from "../context/userData";
import Friendlist from "../components/friendlist";
import Sidebar from "../components/sidebar";
import styles from "../styles/chat.module.css";
import profileStyles from "../styles/profile.module.css";
import communityStyles from "../styles/community.module.css";
import pendingStyles from "../styles/pendingrequest.module.css";
import padlock from "../img/padlock.svg";
import send from "../img/send.png";
import microphone from "../img/microphone.png";
import file from "../img/file.png";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user4 from "../img/user4.svg";
import arrow from "../img/arrow.png";
import ethicon from "../img/eth-icon.svg";
import threedots from "../img/three-dots.svg";
import sparkles from "../img/sparkles.png";
import galleryexport from "../img/galleryexport.svg";
import documenttext from "../img/documenttext.svg";
import editprofile from "../img/editprofile.svg";
import profile from "../img/profile.png";
import PendingRequest from "@/components/pendingrequest";
import ChatProfileCard from "../fragments/ChatProfileCard";
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
import { useRouter } from "next/router";
import { ADD_FRIEND } from "@/graphql/queries";

const Profile = () => {
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
      <div className={profileStyles.bgOverlay}>
        <div className={profileStyles.bgOverlayCard}>
          <p>x</p>
          <div className={profileStyles.bgOverlayCardLeft}>
            <button className={styles.vectorParent}>
              <Image
                className={styles.rimessage3LineIcon}
                alt=""
                src={profile}
              />
              <div className={styles.community}>Profile</div>
            </button>
          </div>
            <div className={profileStyles.bgOverlayCardMiddleLine}/>
          <div className={profileStyles.bgOverlayCardRight}>
            <Image className={profileStyles.user4} alt="" src={user4} />

            <label>Display Name</label>
            <input type="text" />

            <label>Set Status</label>
            <input type="text" />

            <p>Secret phase</p>
            <div>
              <button>Backup</button>
              <button>Reset</button>
            </div>
          </div>
        </div>
      </div>
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

        <div className={profileStyles.profileContainer}>
          <div className={profileStyles.profileTopDiv}>
            <Image className={styles.user1} alt="" src={user1} />
            <p>crispz.eth</p>
            <div className={profileStyles.profileDivEdit}>
              <Image className={styles.vectorIcon} alt="" src={editprofile} />
              <p>Edit Profile</p>
            </div>
          </div>

          <div className={profileStyles.nftContainer}>
            <div className={profileStyles.nftContainerTitle}>NFTs</div>
          </div>

          <div className={profileStyles.nftCardsContainer}>
            <div>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
