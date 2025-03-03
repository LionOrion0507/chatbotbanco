'use client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Header } from './Header/Header';
import styles from './styles.module.scss';
import { ChatInput } from './ChatInput/ChatInput';
import { MessagesContainer } from './MessagesContainer/MessagesContainer';
import { useSendMessage } from '@/app/hooks/useSendMessage';
import { Messages } from '@/app/interface';
import { useGetInitialMessage } from '@/app/hooks/useGetInitialMessage';
import { useSendFile } from '@/app/hooks/useSendFile';

export const ChatBox = (prop: { handleClose: Dispatch<SetStateAction<boolean>> }) => {
  const [messagesList, setMessagesList] = useState<Messages[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [userFile, setUserFile] = useState<File>();
  const sendMessage = useSendMessage();
  const sendFile = useSendFile();
  const getInitialMessage = useGetInitialMessage();
  const initialMessageReady = useRef(false);

  useEffect(() => {
    const handleGetInitialMessage = async () => {
      if (!initialMessageReady.current) {
        initialMessageReady.current = true;
        setIsLoading(true);
  
        try {
          const initialMessage = await getInitialMessage();
          setMessagesList((oldMessages) => [...oldMessages, {message: initialMessage.message, author: initialMessage.author}])
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      }
    }

    handleGetInitialMessage();
  }, [getInitialMessage]);

  
  useEffect(() => {
    const handleTextInput = async () => {
      if (!!userMessage) {
        setMessagesList((oldMessages) => [...oldMessages, {message: userMessage, author: 'User'}]);
        setUserMessage('');
        setIsLoading(true);

        try {
          const mappedResponse = await sendMessage(userMessage);
          setMessagesList((oldMessages) => [...oldMessages, {message: mappedResponse.message, author: mappedResponse.author}]);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      }
    };
    
    handleTextInput();
  }, [sendMessage, userMessage]);

  useEffect(() => {
    const handleFileInput = async () => {
      if (!!userFile) {
        setMessagesList((oldMessages) => [...oldMessages, {message: userFile.name, author: 'User', fileLink: URL.createObjectURL(userFile)}]);
        setUserFile(undefined);
        setIsLoading(true);

        try {
          const mappedResponse = await sendFile(userFile);
          setMessagesList((oldMessages) => [...oldMessages, {message: mappedResponse.message, author: mappedResponse.author}]);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      }
    }

    handleFileInput();
  }, [sendFile, userFile]);

  return (
    <div className={styles.chatBoxContainer}>
      <Header handleClose={prop.handleClose} />
      <MessagesContainer messagesList={messagesList} hasLoadingMessage={isLoading} />
      <ChatInput handleTextInput={setUserMessage} handleFileInput={setUserFile} />
    </div>
  )
};