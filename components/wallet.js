import styles from "../styles/wallet.module.css";
import Image from "next/image";
import { ApolloClient, InMemoryCache, useMutation, gql } from "@apollo/client";

//internal import
import meta from "../img/metamask.png";
import tezos from "../img/tezos.png";
import unstop from "../img/unstop.png";
import cad from "../img/cad.png";
import { userData } from "../context/userData";
import { connectTez } from "@/context/tezos";
import { CREATE_PROFILE } from "@/graphql/queries";
import { changeNetwork } from "@/context/network";

const Wallet = () => {
  const login = userData((state) => state.login);
  const setNetwork = userData((state) => state.setNetwork);
  //create account on graphql
  const [createProfile, { data, loading, error }] = useMutation(
    CREATE_PROFILE,
    {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const createAcc = async (address, network) => {
    createProfile({ variables: { address: address, network: network } });
  };
  //connect metamask
  const connectMeta = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // setCurrentAccount(accounts[0]);
      // console.log(accounts[0]);
      login(accounts[0]);
      createAcc(accounts[0], "polygon");
      setNetwork("polygon");
      await changeNetwork("polygon");
      // window.location.reload();
    } catch (error) {
      alert("Error while connecting to wallet");
      console.log(error);
    }
  };
  //connect tezos
  const connectTezos = async () => {
    const address = await connectTez();
    login(address);
    setNetwork("tezos");
    createAcc(address, "tezos");
  };
  //connect caduceus
  const connectCaduceus = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");

      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // // setCurrentAccount(accounts[0]);
      // // console.log(accounts[0]);
      // login(accounts[0]);
      // createAcc(accounts[0], "caduceus");
      // setNetwork("caduceus");
      await changeNetwork("cmp_testnet");
      // window.location.reload();
    } catch (error) {
      alert("Error while connecting to wallet");
      console.log(error);
    }
  };

  //Unstoppable
  // const unstop = async () => {
  //   try {
  //     const authorization = await uauth.loginWithPopup();
  //     const domainName = authorization.idToken.sub;
  //     login(domainName);
  //     createAcc(domainName, "unstoppable");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={styles.caduceusParent}>
      <button className={styles.caduceus} onClick={() => connectCaduceus()}>
        <Image className={styles.icon} alt="" src={cad} />
        <b className={styles.unstoppable}>Caduceus</b>
      </button>
      <button className={styles.tezos} onClick={() => connectTezos()}>
        <Image className={styles.tezosXtzIcon2} alt="" src={tezos} />
        <b className={styles.unstoppable}>Tezos</b>
      </button>
      <button className={styles.metamask} onClick={() => connectMeta()}>
        <Image className={styles.metamaskFox2Icon} alt="" src={meta} />
        <b className={styles.unstoppable}>Metamask</b>
      </button>
      <button className={styles.unstop}>
        <Image className={styles.icon} alt="" src={unstop} />
        <b className={styles.unstoppable}>Unstoppable</b>
      </button>
    </div>
  );
};

export default Wallet;
