import { useEffect } from "react";
import Image from "next/image";
import Friendlist from "../components/friendlist";
import Sidebar from "../components/sidebar";
import styles from "../styles/chat.module.css";
import logo from "../img/logo.svg";
import send from "../img/send.png";
import microphone from "../img/microphone.png";
import file from "../img/file.png";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import user3 from "../img/user3.png";
import arrow from "../img/arrow.png";

const Chat = () => {
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

  return (
    <div className={styles.chat}>
      <div className={styles.quiltNewLogo8dc214cbfb2f936Parent}>
        <Image
          className={styles.quiltNewLogo8dc214cbfb2f936Icon}
          alt=""
          src={logo}
        />
        <button className={styles.frameParent} data-animate-on-scroll>
          <div className={styles.x4c99923bdParent}>
            <div className={styles.x4c99923bd}>0x4c99...923bd</div>
            <div className={styles.ethereum}>Ethereum</div>
          </div>
          <Image className={styles.vectorIcon} alt="" src={arrow} />
        </button>
      </div>
      <div className={styles.frameGroup}>
        <Sidebar />
        <Friendlist />
        <div className={styles.frameContainer}>
          <div className={styles.frameWrapper}>
            <div className={styles.ellipseParent}>
              <Image className={styles.frameChild} alt="" src={user2} />
              <div className={styles.sunnndayyyParent}>
                <div className={styles.sunnndayyy}>Sunnndayyy</div>
                <div className={styles.ellipseGroup}>
                  <div className={styles.xf4844ab5b4fc}>0xf4844ab5b4fc</div>
                </div>
              </div>
            </div>
          </div>
          <section className={styles.frameSection}>
            <div className={styles.frameDiv}>
              <div className={styles.ellipseContainer}>
                <Image className={styles.frameInner} alt="" src={user3} />
                <div className={styles.sunnndayyyParent}>
                  <div className={styles.daysAgo}>7 days ago</div>
                  <h3 className={styles.gmPickleWrapper}>
                    <div className={styles.gmPickle}>Gm pickle</div>
                  </h3>
                  <h3 className={styles.welcomeToQuiltWrapper}>
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
            </div>
            <div className={styles.frameParent1}>
              <form className={styles.frameForm}>
                <Image className={styles.ellipseIcon} alt="" src={user1} />
                <button className={styles.iconsaxlinearsend}>
                  <Image className={styles.vectorIcon1} alt="" src={send} />
                </button>
              </form>
              <button className={styles.vectorWrapper}>
                <Image className={styles.vectorIcon2} alt="" src={file} />
              </button>
              <button className={styles.iconsaxlinearmicrophone2}>
                <Image className={styles.vectorIcon3} alt="" src={microphone} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Chat;
