import { Messages } from '@/app/interface';
import styles from './MessagesContainer.module.scss';
import { Message } from '../Message/Message';

export const MessagesContainer = (props: {messagesList: Messages[], hasLoadingMessage: boolean}) => {
  const {messagesList, hasLoadingMessage} = props;
  return (
    <div className={styles.messagesContainer}>
      {messagesList?.map((message, index) => (
        <Message message={message} key={index}/>
      ))}
      {hasLoadingMessage && (
        <img src='./loadingDots.gif' alt='loading...' width={30} className={styles.loadingDots}/>
      )}
    </div>
  );
};