import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
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
import { ADD_FRIEND, UPDATE_PROFILE, UPDATE_EMAIL } from "@/graphql/queries";
import OverlayCard from "@/fragments/OverlayCard";

const Profile = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const Username = userData((state) => state.username);
  const avatar = userData((state) => state.avatar);
  const setAvatar = userData((state) => state.setAvatar);
  // const setUsername = userData((state) => state.setUsername);
  const Email = userData((state) => state.email);
  const [email, setemail] = useState(Email);
  const setEmail = userData((state) => state.setEmail);
  const Bio = userData((state) => state.bio);
  const setBio = userData((state) => state.setBio);
  const [description, setdescription] = useState(Bio);
  const Webpage = userData((state) => state.webpage);
  const [website, setwebsite] = useState(Webpage);
  const [fileUrl, setFileUrl] = useState(avatar);
  // const [keys, setkeys] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRBMUQxMzRiODgxNTQ1OEEzOWM3YmIxRTdmRjZiM0JFQTVBZmE5MkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk5NDc4NTgwODgsIm5hbWUiOiJ0ZXpvcyJ9.l40fHgNQsymrAsuDCRmxpGVaH_6p1OjpHYWSiMZq5RE";
  const web3storage = new Web3Storage({ token });
  // const chatState = userData((state) => state.currentChatState);
  // const setCurentChatStateToPendingReq =  userData((state) => state.setCurentChatState(CHAT_PAGE_CONTROLS.SHOW_PENDING_REQUEST))

  // if (typeof window !== "undefined") {
  //   const keys = sessionStorage.getItem("token") ?? "";
  // }

  const [chatState, setChatState] = useState(
    CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCardItem, setShowCardItem] = useState(false);
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
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: (data) => {
      // console.log(data);
      alert("updated successfully !!");
      setBio(data.updateProfile.bio);
      setWebpage(data.updateProfile.externalLink);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [updateEmail] = useMutation(UPDATE_EMAIL, {
    onCompleted: (data) => {
      // console.log(data.updateEmail.email);
      setEmail(data.updateEmail.email);
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
  async function upload(imageFile) {
    const cid = await web3storage.put([imageFile]);
    // console.log(cid);
    return cid;
  }
  const fileUP = () => {
    let upload = document.getElementById("fileUpload");

    upload.click();
  };
  const uploadFile = async (e) => {
    // account = await getAccount();
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      upload(file).then((e) => {
        const url = "https://ipfs.io/ipfs/" + e + "/" + file.name;
        setFileUrl(url);
        const ProfileUpdateDto = {
          bio: description,
          profilePicture: url,
          coverPicture: "Str",
          externalLink: website,
        };
        updateProfile({
          variables: {
            address: address,
            body: ProfileUpdateDto,
          },
        });
        console.log("Uploaded image: ", url);

        setAvatar(url);
        // console.log(e);
      });
    }
    //
  };

  const onSubmit = async () => {
    updateEmail({ variables: { email: email } });
    // updateUsername({ variables: { username: username } });
    const ProfileUpdateDto = {
      bio: description,
      profilePicture: fileUrl,
      coverPicture: "Str",
      externalLink: website,
    };
    updateProfile({
      variables: {
        body: ProfileUpdateDto,
      },
    });
  };
  return (
    <div className={styles.chat} ref={pageRef}>
      {showCardItem && (
        <div className={profileStyles.bgOverlay}>
          <div
            className={profileStyles.bgOverlayCard}
            style={{ width: "560px", height: "560px" }}
          >
            <p onClick={() => setShowCardItem(false)}>x</p>
            <OverlayCard
              children={
                <>
                  <div>
                    <Image className={styles.user4} alt="" src={user4} />
                    <div className={profileStyles.singleEthCard}>
                      <p>The Lost Donkey</p>
                      <p>£3490</p>
                    </div>

                    <div className={profileStyles.singleEthCard}>
                      <div className={profileStyles.singleEthCardOwned}>
                        <div>Owned By</div>
                        <div className={profileStyles.singleEthCardOwnedImg}>
                          <Image className={styles.user1} alt="" src={user1} />
                          <p>crisp.eth</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </div>
      )}
      {showOverlay && (
        <div className={profileStyles.bgOverlay}>
          <div className={profileStyles.bgOverlayCard}>
            <p onClick={() => setShowOverlay(false)}>x</p>
            <OverlayCard
              children={
                <>
                  <div className={profileStyles.bgOverlayCardLower}>
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
                    <div className={profileStyles.bgOverlayCardMiddleLine} />
                    <div className={profileStyles.bgOverlayCardRight}>
                      <Image
                        style={{ cursor: "pointer" }}
                        className={profileStyles.user4}
                        alt="User"
                        src={avatar}
                        width={50}
                        height={50}
                        onClick={() => fileUP()}
                      />
                      <input
                        className="fileUpload"
                        id="fileUpload"
                        type="file"
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        onChange={(e) => {
                          uploadFile(e);
                        }}
                        style={{ display: "none" }}
                      />
                      <label>{Username}</label>
                      <label onClick={() => router.push("/username")}>
                        <button>Change Display Name</button>
                      </label>

                      <input
                        onChange={(e) => setemail(e.target.value)}
                        type="text"
                        placeholder={Email}
                      />

                      <label>Bio</label>
                      <textarea
                        onChange={(e) => setdescription(e.target.value)}
                        placeholder={Bio}
                        rows={3}
                      ></textarea>
                      <label>Webpage</label>
                      <input
                        type="text"
                        onChange={(e) => setwebsite(e.target.value)}
                        placeholder={Webpage}
                      />

                      <p>Secret phase</p>
                      <div className={profileStyles.secretCardsDiv}>
                        <button
                          onClick={() => {
                            // navigator.clipboard.writeText(keys);
                            alert("copied to clipboard !!!");
                          }}
                        >
                          Backup
                        </button>
                        <button
                          onClick={() => {
                            sessionStorage.clear();
                            router.push("/");
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      <button onClick={() => onSubmit()}>Submit</button>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </div>
      )}
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
            <Image
              className={styles.user1}
              alt=""
              src={avatar}
              width={200}
              height={200}
            />
            <p>{Username}</p>
            <div
              className={profileStyles.profileDivEdit}
              onClick={() => setShowOverlay(true)}
            >
              <Image className={styles.vectorIcon} alt="" src={editprofile} />
              <p>Edit Profile</p>
            </div>
          </div>

          <div className={profileStyles.nftContainer}>
            <div className={profileStyles.nftContainerTitle}>NFTs</div>
          </div>

          <div className={profileStyles.nftCardsContainer}>
            <div onClick={() => setShowCardItem(true)}>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div onClick={() => setShowCardItem(true)}>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div onClick={() => setShowCardItem(true)}>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
            <div onClick={() => setShowCardItem(true)}>
              <Image className={styles.user4} alt="" src={user4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
