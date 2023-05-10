import { gql } from "@apollo/client";

export const GET_PROFILE_BYADDRESS = gql`
  query ($address: String!) {
    getProfileByAddress(address: $address) {
      address
      username
      email
      bio
      externalLink
      profilePicture
      friends
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation ($address: String!, $network: String!) {
    createProfile(address: $address, network: $network) {
      address
      network
      email
      bio
      externalLink
    }
  }
`;
export const REQUEST_TOKEN = gql`
  mutation ($address: String!) {
    requestToken(address: $address)
  }
`;

export const UPDATE_USERNAME = gql`
  mutation ($username: String!) {
    updateUsername(username: $username) {
      username
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation ($email: String!) {
    updateEmail(email: $email) {
      email
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation ($body: ProfileUpdateDto!) {
    updateProfile(body: $body) {
      bio
      profilePicture
      coverPicture
      externalLink
    }
  }
`;

export const CREATE_NEWSLETTER_SUBSCRIPTION = gql`
  mutation ($email: String!) {
    createNewsletterSubscription(email: $email) {
      email
    }
  }
`;

export const SEND_P2P_MESSAGE = gql`
  mutation ($data: P2pChatCreateDto!) {
    sendP2pMessage(data: $data) {
      threadId
    }
  }
`;

export const GET_P2P_MESSAGEFEED = gql`
  query ($receiverAddress: String!) {
    getP2pMessageFeed(receiverAddress: $receiverAddress) {
      senderAddress
      messageData {
        contentType
        content
      }
      profile {
        address
        verified
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation ($address: String!) {
    addFriend(address: $address) {
      friends
    }
  }
`;
