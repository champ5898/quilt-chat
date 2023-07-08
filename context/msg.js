import { ApolloClient, InMemoryCache, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";

import { GET_P2P_MESSAGEFEED, SEND_P2P_MESSAGE } from "@/graphql/queries";

const data = {
  receiverAddress: "0x77b72a66C24c24523dE4ce41e871d57550b64b51",
  messageType: "message",
  messageData: { contentType: "text", content: "goiiii" },
  sentAt: "2023-04-15T11:08:46.098+00:00",
};

export const msg = () => {
  const [sendP2pMessage] = useMutation(SEND_P2P_MESSAGE, {
    onCompleted: (data) => {},
    onError: (error) => {
      console.error(error);
    },
  });
  sendP2pMessage({
    variables: { data: data },
  });
  const [address, setaddress] = useState(
    "tz1Sw1gGA6bi2drimg1yUYF6ZcTsmaCyNnuw"
  );
  const { loading, error, msg } = useQuery(GET_P2P_MESSAGEFEED, {
    variables: { address: address },
    pollInterval: 1000,
  });
  console.log(msg);
  return <div></div>;
};
