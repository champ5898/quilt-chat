import { char2Bytes, verifySignature } from "@taquito/utils";
import { RequestSignPayloadInput, SigningType } from "@airgap/beacon-sdk";
import { BaseWallet, ethers } from "ethers";

export const authenticate = async (network, message, address) => {
  if (network == "polygon") {
    try {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const addr = await ethers.utils.verifyMessage(message, signature);
      console.log(addr, address);
      return signature;
    } catch (err) {
      console.log(err);
    }
  } else if (network == "tezos") {
    const wallet = new (await import("@taquito/beacon-wallet")).BeaconWallet({
      name: "Quilt",
      // iconUrl: "https://tezostaquito.io/img/favicon.svg",
      preferredNetwork: "ghostnet",
    });
    // The data to format
    const dappUrl = "https://lounge-quilt.com/";

    const input = message;

    // The full string
    const formattedInput = ["Tezos Signed Message:", dappUrl, input].join(" ");

    // The bytes to sign
    // const m = "0501003234656434396632623231663064";
    // const bytes = char2Bytes(message);
    // const length = message.length.toString();
    // const payloadBytes = "05" + "0100" + char2Bytes(length) + message;

    // The payload to send to the wallet
    const activeAccount = await wallet.client.getActiveAccount();
    const userAddress = activeAccount.address;
    const payload = {
      signingType: SigningType.MICHELINE,
      payload: message,
      sourceAddress: userAddress,
    };

    // The signing
    const signedPayload = await wallet.client.requestSignPayload(payload);

    // The signature
    const { signature } = signedPayload;

    return signature;
  }
};

// export const connectingWithSmartContract = async () => {
//   try {
//     const web3Modal = new Wenb3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);
//     console.log(contract);
//     return contract;
//   } catch (error) {
//     console.log("Something went wrong while connecting with contract", error);
//   }
// };
