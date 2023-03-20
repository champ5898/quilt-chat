/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/group/fetcher"




export function getMessages(id){
    const {data, error} = useSWR(`/api/chat/messages/${id}`, fetcher, { refreshInterval: 1000 })
    
    return{
        register: data,
        isLoading: !error && !data,
        isError: error
    }
}

export async function getData(id) {
  //gets and return a conversation through an Id
  const { data, error } = useSWR(`/api/chat/conversation/${id}`, fetcher, {
    refreshInterval: 1000,
  });
    return {
      joke: data,
      Loading: !error && !data,
      Error: error,
    };
}


