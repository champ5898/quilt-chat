import styles from "../styles/friendlist.module.css";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import {
  UPDATE_PROFILE,
  UPDATE_EMAIL,
  GET_PROFILE_BYADDRESS,
  UPDATE_USERNAME,
} from "../graphql/queries";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import Image from "next/image";
import { img } from "../context/userData";
import { userData } from "../context/userData";
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
const Friendlist = ({
  showCommunity,
  placeholder,
  children,
  switchChatStateToFriendList,
  updateCurrentUserOnDashboard,
}) => {
  let friendData = [];
  const friends = userData((state) => state.friends);

  friends.forEach(async (element) => {
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
        console.log("single friend");
        console.log(friend);

        friendData.push(friend);
      } catch (error) {
        console.log(error);
      }
    };
    await setFriends();
    console.log("friendData");
    console.log(friendData);
  });

  const shortenEthAddress = (address) => {
    if (!address) return "Not Connected";
    const firstStr = address.slice(0, 16);
    const lastStr = address.slice(address.length - 4, address.length);
    return firstStr + "...." + lastStr || "";
  };

  return (
    <section className={styles.frameParent}>
      <input
        className={styles.frameChild}
        type="text"
        placeholder={placeholder}
      />

      {showCommunity && (
        <>
          <div className={styles.directMessages}>Direct Messages</div>
          <div className={styles.frameItem} />
          <section className={styles.frameGroup}>
            {/* <button className={styles.ellipseParent}>
                <Image className={styles.frameInner} alt="" src={user2} />
                <div className={styles.westwoodeth}>0xuggjg645ytff</div>
              </button> */}
            {friends.map((friend) => {
              console.log("friend 1");
              console.log(friend);
              return (
                <button
                  className={styles.frameWrapper}
                  onClick={() => { 
                    updateCurrentUserOnDashboard(friend);
                    switchChatStateToFriendList(friend);
                  }}
                >
                  <div className={styles.ellipseGroup}>
                    <Image
                      className={styles.frameInner}
                      alt=""
                      src={friend.profilePic || user3}
                    />
                    <div className={styles.westwoodeth}>
                      {shortenEthAddress(friend)}
                    </div>
                  </div>
                </button>
              );
            })}
          </section>
        </>
      )}

      {children}
    </section>
  );
};

export default Friendlist;
