import { Dispatch, SetStateAction, useRef, useState } from 'react';
import styles from './ChatInput.module.scss';
import { Input } from 'react-chat-elements'

export const ChatInput = (prop: {handleTextInput: Dispatch<SetStateAction<string>>, handleFileInput: Dispatch<SetStateAction<File | undefined>>}) => {
  const {handleTextInput, handleFileInput} = prop;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    if (!!hiddenFileInput?.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];

    if (!fileUploaded) return;

    setFile(fileUploaded);
  };

  const handleSubmit = () => {
    if (!!value) {
      handleTextInput(value);
      setValue('');
    }

    if (!!file) {
      handleFileInput(file);
      setFile(undefined);
    }

  };

  const fileUpload = (
    <>
      <button onClick={handleClick} className={styles.chatInputButton}>
        <img src='./paperclip.png' />
      </button>
      <input type='file' style={{ display: "none" }} ref={hiddenFileInput} onChange={handleChange} accept='image/jpeg, image/jpg, .pdf' />
    </>
  );

  const sendMessage = (
    <button onClick={handleSubmit} className={styles.chatInputButton}>
      <img src='./sendMessage.png' />
    </button>
  );

  return (
    <div className={styles.inputContainer}>
      {!!file && (
        <div className={styles.filePreview}>
          <a href={URL.createObjectURL(file)}>
            {file.name}
          </a>
          <button onClick={() => setFile(undefined)} className={styles.closeButton}>
            <img src="./closeMark.png" alt='close button' />
          </button>
        </div>
      )}
      <Input maxHeight={50} leftButtons={fileUpload} rightButtons={sendMessage} className={styles.inputComponents} placeholder='Escribe tu mensaje aqui' value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)} onSubmit={handleSubmit}/>
    </div>
  );
};