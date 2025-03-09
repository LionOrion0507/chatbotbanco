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
              {'Toda información que proporcione aquí se mantendrá protegida por BanBajío. Para consultar nuestro aviso de privacidad, de click\n'}
              <a href=''>aquí</a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};