import { JSX, useRef } from 'react';
import styles from './ChatInput.module.scss';
import { Input } from 'react-chat-elements'

export const ChatInput = () => {
  const hiddenFileInput = useRef<JSX.Element>(null);

  const handleClick = () => {
    if (!!hiddenFileInput?.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    console.log('hello there', fileUploaded);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const fileUpload = (
    <>
      <button onClick={handleClick} className={styles.chatInputButton}>
        <img src='./paperclip.png' />
      </button>
      <input type='file' style={{ display: "none" }} ref={hiddenFileInput} onChange={handleChange} />
    </>
  );

  const sendMessage = (
    <button onClick={handleSubmit} className={styles.chatInputButton}>
      <img src='./sendMessage.png' />
    </button>
  );

  return (
    <div>
      <Input maxHeight={50} leftButtons={fileUpload} rightButtons={sendMessage} className={styles.inputComponents} />
    </div>
  );
};