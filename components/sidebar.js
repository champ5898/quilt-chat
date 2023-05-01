import styles from "../styles/sidebar.module.css";
import Image from "next/image";
import chat from "../img/comment.png";
import community from "../img/community.png";
import friend from "../img/friend.png";
import globe from "../img/globe.png";
import profile from "../img/profile.png";
import toggle from "../img/setting.png";
import moon from "../img/moon.png";
import logo from "../img/logo.svg";
const Sidebar = () => {
  return (
    <div className={styles.sidebarParent}>
      <section className={styles.sidebarParentGroup}>
        <button className={styles.logoTextContainer}>
          <Image
          className={styles.quiltNewLogo8dc214cbfb2f936Icon}
          alt=""
          src={logo}
        />
          {/* <p className={styles.logoText}>Quilt</p> */}
        </button>
        <button className={styles.communicationCommentParent}>
          <Image className={styles.communicationComment} alt="" src={chat} />
          <h1 className={styles.chat}>Chat</h1>
        </button>
        <button className={styles.rimessage3LineParent}>
          <Image className={styles.rimessage3LineIcon} alt="" src={community} />
          <div className={styles.community}>Community</div>
        </button>
        <button className={styles.vectorParent}>
          <Image className={styles.vectorIcon} alt="" src={friend} />
          <div className={styles.community}>Friends</div>
        </button>
        <button className={styles.vectorGroup}>
          <Image className={styles.vectorIcon} alt="" src={globe} />
          <div className={styles.community}>World chat</div>
        </button>
        <button className={styles.vectorParent}>
          <Image className={styles.rimessage3LineIcon} alt="" src={profile} />
          <div className={styles.community}>Profile</div>
        </button>
      </section>
      <section className={styles.lineParent}>
        <div className={styles.frameChild} />
        <button className={styles.iconsaxlinearsetting3Parent}>
          <Image className={styles.iconsaxlinearsetting3} alt="" src={toggle} />
          <div className={styles.community}>Toggle</div>
        </button>
        <button className={styles.rimoonClearLineParent}>
          <Image className={styles.rimessage3LineIcon} alt="" src={moon} />
          <div className={styles.switchTheme}>Switch Theme</div>
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
