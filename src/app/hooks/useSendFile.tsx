import axios from "axios";
import { useCallback } from "react";
import { Messages } from "../interface";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-file-stream`;

type ChatResponse = {
  message: string,
  data: {
    extracted_names: string,
    status: string,
  }
}

const mapResponse = (message: ChatResponse): Messages => {
  const chatResponse = message.data.status;
  return {
    message: chatResponse,
    author: 'Agent',
  }
};

export const useSendFile = () => {
  return useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const mappedResponse = mapResponse(response.data);
    return mappedResponse;
  }, []);
};
