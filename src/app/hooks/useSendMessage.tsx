import axios from "axios";
import { useCallback } from "react";
import { Messages } from "../interface";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat-stream`;

type ChatResponse = {
  message: string,
  data: {
    response: string,
    status_update: string,
  }
}

const mapResponse = (message: ChatResponse): Messages => {
  const chatResponse = message.data.response;
  return {
    message: chatResponse,
    author: 'Agent',
  }
};

export const useSendMessage = () => {
  return useCallback(async (message: string) => {
    const response = await axios.post(URL, {message});
    const mappedResponse = mapResponse(response.data);
    return mappedResponse;
  }, []);
};
