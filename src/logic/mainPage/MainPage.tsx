import styles from 'src/logic/mainPage/MainPAge.module.scss';

export const Main: React.FC = () => {
  return (
    <>
      <div className={styles.main_image_wrapper}>
        <img src="src/public/main_image2.jpg" alt="decor" className={styles.main_image} />
      </div>
      <div className={styles.promopictures}>
        <img src="src/public/promofood.png" alt="food promo" className={styles.food_background} />
        <img src="src/public/toypromo.png" alt="pic promo" className={styles.pic_background} />
      </div>
    </>
  );
};
