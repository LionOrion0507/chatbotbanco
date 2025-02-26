'use client';
import styles from './styles.module.scss';

export const BotOpen = () => {
  return (
    <button className={styles.openChatContainer} onClick={() => console.log('click')} >
      <div className={styles.openChatText}>
        Estás buscando aplicar a un crédito? Haz click aquí!
      </div>
      <div className={styles.openChatCircle} />
    </button>
  )
};