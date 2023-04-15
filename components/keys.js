import React, { useState } from "react";
import styles from "../styles/keys.module.css";
import { ApolloClient, InMemoryCache, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";

import Phrase from "../pages/phrase";
import keys from "../img/keys.png";
import { userData } from "../context/userData";
import { REQUEST_TOKEN } from "@/graphql/queries";
import { authenticate } from "@/account/auth";

const Keys = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const [token, setToken] = useState("");
  const router = useRouter();
  //request token on graphql
  const [requestToken] = useMutation(REQUEST_TOKEN, {
    onCompleted: (data) => {
      setToken(data.requestToken);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const reqToken = async () => {
    const keys = localStorage.getItem("token");
    console.log(keys);
    if (keys == null) {
      const data = await requestToken({ variables: { address: address } });
      // console.log(data.data);
      const signature = await authenticate(
        network,
        data.data.requestToken,
        address
      );
      const auth = data.data.requestToken + "-_-" + signature;
      // setToken(auth);
      localStorage.setItem("token", auth);
      // console.log(auth);
      router.push("/phrase");
    } else {
      router.push("/phrase");
    }
  };
  // if (keys == undefined) {
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
      <button className={styles.generateKeysWrapper} onClick={() => reqToken()}>
        <b className={styles.generateKeys}>Generate keys</b>
      </button>
    </div>
  );
  // } else {
  //   router.push("/phrase");
  // }
};

export default Keys;
