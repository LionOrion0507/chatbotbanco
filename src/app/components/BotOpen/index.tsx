'use client';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';

export const BotOpen = (prop: { handleOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { handleOpen } = prop;
  return (
    <button className={styles.openChatContainer} onClick={() => handleOpen(true)} >
      <div className={styles.openChatText}>
        Estás buscando aplicar a un crédito? Haz click aquí!
      </div>
      <div className={styles.openChatCircle} />
    </button>
  )
};