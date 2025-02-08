import React from 'react';
import style from './WineRating.module.css';
import Button from '../../components/common/Button';

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
            src="/icons/stars.png"
            alt="stars"
            className={style.starImage}
          />,
        );
      } else {
        stars.push(
          <img
            key={i}
            src="/icons/empty-stars.png"
            alt="empty Star"
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
        <p>5</p>
        <p>4</p>
        <p>3</p>
        <p>2</p>
        <p>1</p>
        <Button
          type="default"
          size="width113"
          color="purple"
          textColor="white"
          text="리뷰 남기기"
        />
      </div>
    </div>
  );
};

export default WineRating;
