import styles from "../styles/friendlist.module.css";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import Image from "next/image";
import { userData } from "../context/userData";
import { CHAT_PAGE_CONTROLS } from "../constants/chat";
const Friendlist = (chatState) => {
  const friends = userData((state) => state.friends);
  return (
    <section className={styles.frameParent}>
      <input
        className={styles.frameChild}
        type="text"
        placeholder="Search ens or 0x41c...bd"
      />
      {chatState = CHAT_PAGE_CONTROLS.SHOW_FRIEND_LIST && (
        <>
          <div className={styles.directMessages}>Direct Messages</div>
          <div className={styles.frameItem} />

          <section className={styles.frameGroup}>
            <button className={styles.ellipseParent}>
              <Image className={styles.frameInner} alt="" src={user2} />
              <div className={styles.westwoodeth}>0xuggjg645ytff</div>
            </button>
            {friends.forEach((e) => (
              <button className={styles.frameWrapper}>
                <div className={styles.ellipseGroup}>
                  <Image className={styles.frameInner} alt="" src={user3} />
                  <div className={styles.westwoodeth}>{e}</div>
                </div>
              </button>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default Friendlist;
