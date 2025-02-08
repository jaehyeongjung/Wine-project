import React from 'react';
import style from './WineRating.module.css';

interface WineRatingProps {
  rating: number;
}

const WineRating: React.FC<WineRatingProps> = ({ rating }) => {
  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <img
            key={i}
            src="/icons/test1.png"
            alt="Filled Star"
            className={style.starImage}
          />,
        );
      } else {
        stars.push(
          <img
            key={i}
            src="/icons/test2.png"
            alt="Empty Star"
            className={style.starImage}
          />,
        );
      }
    }
    return stars;
  };

  return (
    <div>
      <div className={style.ratingBox}>
        <div className={style.rating}>
          <p className={style.ratingAvg}>{rating}</p>
          <div className={style.ratingStarsBox}>
            <div className={style.ratingStars}>
              <p>{getRatingStars(rating)}</p>
              <p className={style.ratingCount}>5,446개의 후기</p>
            </div>
          </div>
        </div>
        1
      </div>
    </div>
  );
};

export default WineRating;
