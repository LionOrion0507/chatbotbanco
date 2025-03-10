import axios from "axios";
import { useCallback } from "react";
import { Messages } from "../interface";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/initial-greeting`;

type ChatGreeting = {
  message: string,
  data: {
    greeting: string,
  }
}

const mapResponse = (message: ChatGreeting): Messages => {
  const chatGreeting = message.data.greeting;
  return {
    message: chatGreeting,
    author: 'Agent',
  }
};

export const useGetInitialMessage = () => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  return useCallback(async () => {
    console.log(URL);
    const response = await axios.post(URL, {stream: false});
    const mappedResponse = mapResponse(response.data);
    return mappedResponse;
  }, []);
};
