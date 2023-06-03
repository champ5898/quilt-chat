const cmpId = `0x${Number(512512).toString(16)}`;
// console.log(cmpId);
export const networks = {
  polygon_testnet: {
    chainName: "Mumbai",

    nativeCurrency: {
      name: "MATIC Token",
      symbol: "MATIC",
      decimals: 18,
    },

    chainId: "0x13881",
    rpcUrls: [
      "https://polygon-mumbai.blockpi.network/v1/rpc/public/",
      "https://endpoints.omniatech.io/v1/matic/mumbai/public/",
      "https://matic-mumbai.chainstacklabs.com/",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  cmp_testnet: {
    chainId: "0x7D200",
    chainName: "CMP-Testnet",
    nativeCurrency: {
      name: "Caduceus Testnet Token",
      symbol: "CMP",
      decimals: 18,
    },

    rpcUrls: ["https://galaxy.block.caduceus.foundation"],
    blockExplorerUrls: ["https://galaxy.scan.caduceus.foundation"],
  },
  cmp_mainnet: {
    name: "CMP-Mainnet",
    chain: "CMP",
    rpcUrls: [
      "https://mainnet.block.caduceus.foundation",
      "wss://mainnet.block.caduceus.foundation",
    ],
    faucets: [],
    nativeCurrency: {
      name: "Caduceus Token",
      symbol: "CMP",
      decimals: 18,
    },
    infoURL: "https://caduceus.foundation/",
    shortName: "cmp-mainnet",
    chainId: 256256,
    networkId: 256256,
    explorers: [
      {
        name: "Mainnet Scan",
        url: "https://mainnet.scan.caduceus.foundation",
        standard: "none",
      },
    ],
  },
  polygon: {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};
