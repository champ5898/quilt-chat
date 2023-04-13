import styles from "../styles/wallet.module.css";
import Image from "next/image";

//internal import
import meta from "../img/metamask.png";
import tezos from "../img/tezos.png";
import unstop from "../img/unstop.png";
import cad from "../img/cad.png";
import { userData } from "../context/userData";
import { connectTez } from "@/context/tezos";

const Wallet = () => {
  const login = userData((state) => state.login);
  const setNetwork = userData((state) => state.setNetwork);
  //connect metamask
  const connectMeta = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // setCurrentAccount(accounts[0]);
      login(accounts[0]);
      setNetwork("polygon");
      // window.location.reload();
    } catch (error) {
      alert("Error while connecting to wallet");
    }
  };
  //connect tezos
  const connectTezos = async () => {
    const address = await connectTez();
    login(address);
    setNetwork("tezos");
  };

  return (
    <div className={styles.caduceusParent}>
      <button className={styles.caduceus}>
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
