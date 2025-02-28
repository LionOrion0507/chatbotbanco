import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Header.module.scss';

export const Header = (prop: { handleClose: Dispatch<SetStateAction<boolean>> }) => {
  const { handleClose } = prop;
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className={styles.headerContainer}>
      <button onClick={() => handleClose(false)} className={styles.closeButton}>
        <img src="./closeMark.png" alt='close button' />
      </button>
      <div className={styles.moreInfo} onMouseOver={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
        <img src="./infoIcon.png" alt='more information' />
        {showInfo && (
          <div className={styles.infoPopup}>
            <p>
              información de privacidad. Tu información es nuestra. La vamos a vender y no puedes hacer nada al respecto
            </p>
          </div>
        )}
      </div>
    </div>
  );
};