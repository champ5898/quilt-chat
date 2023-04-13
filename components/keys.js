import { useCallback } from "react";
import styles from "../styles/keys.module.css";
import Image from "next/image";
import keys from "../img/keys.png";

const Keys = () => {
  const onFrameButtonClick = useCallback(() => {
    // Please sync "keys generated" to the project
  }, []);

  return (
    <div className={styles.keys}>
      <div className={styles.keysInner}>
        <Image className={styles.frameChild} alt="" src={keys} />
      </div>
      <div className={styles.getYourKeysWrapper}>
        <h1 className={styles.getYourKeysContainer}>
          <span>{`Get `}</span>
          <span className={styles.yourKeys}>your keys</span>
        </h1>
      </div>
      <div className={styles.aSetOfKeyControlsYourAccWrapper}>
        <h3 className={styles.aSetOfContainer}>
          <p className={styles.aSetOf}>
            A set of key controls your account, your keys live on your laptop
          </p>
          <p className={styles.aSetOf}>so only you can use them</p>
        </h3>
      </div>
      <button
        className={styles.generateKeysWrapper}
        onClick={onFrameButtonClick}
      >
        <b className={styles.generateKeys}>Generate keys</b>
      </button>
    </div>
  );
};

export default Keys;
