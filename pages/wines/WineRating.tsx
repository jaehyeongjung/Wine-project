import React from 'react';
import style from './WineRating.module.css';
import Button from '../../components/common/Button';

const WineRating: React.FC = () => {
  const avgRatings = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
  };

  const totalRatings = Object.values(avgRatings).reduce(
    (acc, count) => acc + count,
    0,
  );

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <img
            key={i}
            src="/icons/stars.png"
            alt="full star"
            className={style.starImage}
          />,
        );
      } else {
        stars.push(
          <img
            key={i}
            src="/icons/empty-stars.png"
            alt="empty star"
            className={style.starImage}
          />,
        );
      }
    }
    return stars;
  };

  const averageRating = 4.8;

  return (
    <div className={style.ratingBox}>
      <div className={style.rating}>
        <p className={style.ratingAvg}>{averageRating}</p>
        <div className={style.ratingStarsBox}>
          <div>
            <p>{getRatingStars(averageRating)}</p>
            <p className={style.ratingCount}>
              {totalRatings.toLocaleString()}개의 후기
            </p>
          </div>
        </div>
      </div>

      <div className={style.ratingBars}>
        {Object.entries(avgRatings)
          .reverse()
          .map(([score, count]) => (
            <div key={score} className={style.ratingRow}>
              <p className={style.ratingScore}>{score}점</p>
              <div className={style.ratingBarContainer}>
                <div
                  className={style.ratingBar}
                  style={{
                    width: `${(count / totalRatings) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
      <div className={style.ratingButton}>
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
