import Wallet from "./wallet";
import Keys from "./keys";
import styles from "../styles/index.module.css";
import Image from "next/image";
import chat from "../img/chat.png";
import { userData } from "../context/userData";

export default function Home() {
  const isLogged = userData((state) => state.isLogged);
  if (isLogged == false) {
    return (
      <div className={styles.walletLogin}>
        <div className={styles.photo}>
          <div className={styles.makingBlockchainSocialParent}>
            <h1 className={styles.makingBlockchainSocialContainer}>
              <span>{`Making `}</span>
              <span className={styles.blockchainSocial}>Blockchain Social</span>
            </h1>
            <Image className={styles.frameChild} alt="" src={chat} />
          </div>
        </div>
        <div className={styles.login}>
          <h2 className={styles.signInWithContainer}>
            <p className={styles.signInWith}>Sign in with your wallet</p>
            <p className={styles.signInWith}>to continue</p>
          </h2>
          <div className={styles.buttons}>
            <Wallet />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Keys />
      </div>
    );
  }
}
