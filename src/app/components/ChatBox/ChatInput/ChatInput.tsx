import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import styles from './ChatInput.module.scss';
import Image from 'next/image';

export const ChatInput = (prop: {disabled: boolean, handleTextInput: Dispatch<SetStateAction<string>>, handleFileInput: Dispatch<SetStateAction<File | undefined>>}) => {
  const {handleTextInput, handleFileInput, disabled} = prop;
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <Image src='/paperclip.png' width={30} height={30} alt='add files'/>
      </button>
      <input type='file' style={{ display: "none" }} ref={hiddenFileInput} onChange={handleChange} accept='image/jpeg, image/jpg, .pdf' />
    </>
  );

  const sendMessage = (
    <button disabled={disabled} className={styles.chatInputButton}>
      <Image src='/sendMessage.png' width={30} height={30} alt='send message'/>
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
      <div className={styles.inputComponents}>
        {fileUpload}
        <form onSubmit={e => handleSubmit(e)}>
          <input disabled={disabled} placeholder='Escribe tu mensaje aqui' value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}/>
          {sendMessage}
        </form>
      </div>
    </div>
  );
};