import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

export const Header = (prop: { handleClose: Dispatch<SetStateAction<boolean>> }) => {
  const { handleClose } = prop;
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className={styles.headerContainer}>
      <button onClick={() => handleClose(false)} className={styles.closeButton}>
        <Image src='/closeMark.png' alt='close button' width={20} height={20} />
      </button>
      <div className={styles.moreInfo} onMouseOver={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
        <Image src='/infoIcon.png' alt='more information' width={30} height={30} />
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