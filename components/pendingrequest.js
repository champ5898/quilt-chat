import styles from "../styles/pendingrequest.module.css";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import cancel_checkmark from "../img/cancel_checkmark.svg";
import good_checkmark from "../img/good_checkmark.svg";
import Image from "next/image";
import { userData } from "../context/userData";
const PendingRequest = () => {
  const friends = userData((state) => state.friends);
  return (
    <section className={styles.frameParent}>
      {/* <input
        className={styles.frameChild}
        type="text"
        placeholder="Search ens or 0x41c...bd"
      /> */}
      <div className={styles.directMessages}>Pending Request</div>
      <div className={styles.frameItem} />

      <section className={styles.frameGroup}>
        <button className={styles.ellipseParent}>
        <div className={styles.nameDiv}>
        <Image className={styles.frameInner} alt="" src={user2} />
          <div className={styles.westwoodeth}>0xuggjg645ytff</div>
        </div>
          <div className={styles.actionButtons}>
          <Image className={styles.frameInner} alt="" src={cancel_checkmark} />
          <Image className={styles.frameInner} alt="" src={good_checkmark} />
          </div>
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

      <div className={styles.directMessages}>Ongoing Request</div>
      <div className={styles.frameItem} />

      <section className={styles.frameGroup}>
        <button className={styles.ellipseParent}>
        <div className={styles.nameDiv}>
        <Image className={styles.frameInner} alt="" src={user2} />
          <div className={styles.westwoodeth}>0xuggjg645ytff</div>
        </div>
          {/* <div className={styles.actionButtons}>
          <Image className={styles.frameInner} alt="" src={cancel_checkmark} />
          <Image className={styles.frameInner} alt="" src={good_checkmark} />
          </div> */}
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
    </section>
  );
};

export default PendingRequest;
