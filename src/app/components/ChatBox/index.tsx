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

  const typeMessage = (agentMessage: Messages) => {
    const { message, author } = agentMessage;
    let index = 0;
    let currentMessage = '';
    setIsLoading(false);
  
    const interval = setInterval(() => {
      if (index < message.length) {
        currentMessage += message[index];
        setMessagesList(prev => {
          const updatedMessages = [...prev];
          if (updatedMessages[updatedMessages.length - 1]?.author === 'Agent') {
            updatedMessages[updatedMessages.length - 1].message = currentMessage;
          } else {
            updatedMessages.push({ message: currentMessage, author: author });
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Speed of typing effect
  };

  useEffect(() => {
    const handleGetInitialMessage = async () => {
      if (!initialMessageReady.current) {
        initialMessageReady.current = true;
        setIsLoading(true);
  
        try {
          const initialMessage = await getInitialMessage();
          typeMessage(initialMessage);
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
          typeMessage(mappedResponse);
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
          typeMessage(mappedResponse);
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
      <ChatInput handleTextInput={setUserMessage} handleFileInput={setUserFile} disabled={isLoading}/>
    </div>
  )
};