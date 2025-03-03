import { Messages } from "@/app/interface";
import styles from './Message.module.scss';

export const Message = (props: {message: Messages}) => {
  const {message} = props;
  const className = message.author === 'User' ? styles.userMessage : styles.agentMessage;
  return (
    <div className={styles.message}>
      <div className={className}>
        {message.fileLink ? (
          <a href={message.fileLink}>
            {message.message}
          </a>
        ) : (
          <>
            {message.message}
          </>
        )}
      </div>
    </div>
  );
};