import { useCallback } from "react";
import styles from "./index.module.css";

const Phrase = () => {
  const onFrameButton1Click = useCallback(() => {
    // Please sync "keys generated" to the project
  }, []);

  return (
    <div className={styles.keys}>
      <div className={styles.keysGeneratedSuccessfullyWrapper}>
        <h1 className={styles.keysGeneratedSuccessfullyContainer}>
          <span>{`Keys `}</span>
          <span className={styles.generatedSuccessfully}>
            generated successfully!
          </span>
        </h1>
      </div>
      <textarea
        className={styles.keysChild}
        placeholder="Pickle Wickle Quilt halloween dark"
      />
      <button className={styles.tapThePhraseToCopyItWrapper}>
        <h3 className={styles.tapThePhrase}>Tap the phrase to copy it</h3>
      </button>
      <button className={styles.continueWrapper} onClick={onFrameButton1Click}>
        <b className={styles.continue}>Continue</b>
      </button>
    </div>
  );
};

export default Phrase;
