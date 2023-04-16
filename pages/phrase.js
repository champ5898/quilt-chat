import { useCallback, useState } from "react";
import styles from "../styles/phrase.module.css";
import { useRouter } from "next/router";
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
import { userData } from "../context/userData";

const Phrase = () => {
  const router = useRouter();
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const Username = userData((state) => state.username);
  const setUsername = userData((state) => state.setUsername);

  const { loading, error, data } = useQuery(GET_PROFILE_BYADDRESS, {
    variables: { address: address },
    pollInterval: 1000,
  });
  const updateData = () => {
    try {
      const name = data.getProfileByAddress.username;
      // setusername(name);

      setUsername(name);

      // console.log(loading, data, error);
    } catch (err) {
      console.log(err);
      // console.log(loading, data, error);
    }
  };
  setInterval(updateData, 1000);

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
