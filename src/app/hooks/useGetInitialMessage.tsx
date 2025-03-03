import axios from "axios";
import { useCallback } from "react";
import { Messages } from "../interface";

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
  return useCallback(async () => {
    const response = await axios.post('http://127.0.0.1:5000/initial-greeting', {stream: false});
    const mappedResponse = mapResponse(response.data);
    return mappedResponse;
  }, []);
};
