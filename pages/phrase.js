import { useCallback, useState } from "react";
import styles from "../styles/phrase.module.css";
import { useRouter } from "next/router";

const Phrase = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const keys = localStorage.getItem("token");

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
        <textarea className={styles.keysChild} value={keys} />
        <button
          className={styles.tapThePhraseToCopyItWrapper}
          onClick={() => navigator.clipboard.writeText(keys)}
        >
          <h3 className={styles.tapThePhrase}>Tap here to copy it</h3>
        </button>
        <button
          className={styles.continueWrapper}
          onClick={() => router.push("/username")}
        >
          <b className={styles.continue}>Continue</b>
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Phrase;
