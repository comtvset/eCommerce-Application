import styles from 'src/logic/mainPage/MainPAge.module.scss';
import mainImage from 'src/public/main_image2.jpg';
import promofood from 'src/public/promofood.png';
import promotoy from 'src/public/toypromo.png';

export const Main: React.FC = () => {
  return (
    <>
      <div className={styles.main_image_wrapper}>
        <img src={mainImage} alt="decor" className={styles.main_image} />
      </div>
      <div className={styles.promopictures}>
        <img src={promofood} alt="food promo" className={styles.food_background} />
        <img src={promotoy} alt="pic promo" className={styles.pic_background} />
      </div>
    </>
  );
};
