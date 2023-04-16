import styles from "../styles/username.module.css";
import userlogo from "../img/username.svg";
import { useState, useEffect } from "react";
import Image from "next/image";
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
import { useRouter } from "next/router";

const ClaimAUsername = () => {
  const address = userData((state) => state.address);
  const network = userData((state) => state.network);
  const Username = userData((state) => state.username);
  const setUsername = userData((state) => state.setUsername);
  const [username, setusername] = useState(Username);
  const router = useRouter();

  // const { loading, error, data } = useQuery(GET_PROFILE_BYADDRESS, {
  //   variables: { address: address },
  //   pollInterval: 1000,
  // });
  // const updateData = () => {
  //   try {
  //     const name = data.getProfileByAddress.username;
  //     // setusername(name);

  //     setUsername(name);

  //     console.log(loading, data, error);
  //   } catch (err) {
  //     console.log(err);
  //     console.log(loading, data, error);
  //   }
  // };
  // setInterval(updateData, 10000);

  const [updateUsername] = useMutation(UPDATE_USERNAME, {
    onCompleted: (data) => {
      // console.log(data.updateUsername.username);
      setUsername(data.updateUsername.username);
      alert("Claimed successfully!!");
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });
  const onSubmit = async () => {
    updateUsername({ variables: { address: address, username: username } });
  };
  return (
    <div className={styles.claimAUsername}>
      <Image className={styles.claimAUsernameChild} alt="" src={userlogo} />
      <div className={styles.claimAUsernameParent}>
        <h1 className={styles.claimAUsernameContainer}>
          <span>{`Claim a `}</span>
          <span className={styles.username}>username</span>
        </h1>
        <h2 className={styles.youCanChange}>you can change it anytime</h2>
      </div>

      <input
        className={styles.claimAUsernameItem}
        type="text"
        placeholder={username}
        onChange={(e) => setusername(e.target.value)}
      />

      <div className={styles.frameParent}>
        <button className={styles.claimWrapper} onClick={() => onSubmit()}>
          <b className={styles.claim}>Claim</b>
        </button>
        <button
          className={styles.continueWrapper}
          onClick={() => router.push("/chat")}
        >
          <b className={styles.continue}>Continue</b>
        </button>
      </div>
    </div>
  );
};

export default ClaimAUsername;
