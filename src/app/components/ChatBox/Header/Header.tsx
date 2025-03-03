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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate sodales egestas. Curabitur rutrum pharetra arcu sit amet tincidunt. Pellentesque eget sem sapien. Nulla sagittis metus in nulla varius blandit. Nulla mattis fermentum rutrum. Cras risus neque, vulputate in feugiat sed, maximus in ex. Nam pulvinar venenatis arcu. Proin laoreet dictum metus, fermentum dignissim erat sollicitudin sed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};