'use client';
import { Dispatch, SetStateAction } from 'react';
import { Header } from './Header/Header';
import styles from './styles.module.scss';
import { ChatInput } from './ChatInput/ChatInput';
import { MessagesContainer } from './MessagesContainer/MessagesContainer';

export const ChatBox = (prop: { handleClose: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className={styles.chatBoxContainer}>
      <Header handleClose={prop.handleClose} />
      <MessagesContainer />
      <ChatInput />
    </div>
  )
};