import React from 'react';
import style from './wineRating.module.css';
import Button from '../Button';
import useDevice from '../../../hooks/useDevice';

const avgRatings = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
const totalRatings = Object.values(avgRatings).reduce(
  (acc, count) => acc + count,
  0,
);
const averageRating = 4.8;

const getRatingStars = (rating: number, mode: string) => {
  const stars = Math.floor(rating);
  return Array.from({ length: 5 }, (_, i) => (
    <img
      key={i}
      src={i < stars ? '/icons/starColor.svg' : '/icons/star.svg'}
      alt={i < stars ? 'full star' : 'empty star'}
      className={`${style.ratingStar} ${style[`ratingStar_${mode}`]}`}
    />
  ));
};

const RatingBars = ({ className }: { className: string }) => (
  <div className={`${style.ratingBars} ${className}`}>
    {Object.entries(avgRatings)
      .reverse()
      .map(([score, count]) => (
        <div key={score} className={style.ratingBarRow}>
          <p className={style.ratingScore}>{score}점</p>
          <div className={style.ratingBarContainer}>
            <div
              className={style.ratingBar}
              style={{ width: `${(count / totalRatings) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
  </div>
);

const DesktopLayout = ({ mode }: { mode: string }) => (
  <div className={style.ratingBox}>
    <div className={`${style.rating} ${style[`rating_${mode}`]}`}>
      <div className={style.ratingStarsInfo}>
        <p className={style.ratingAvg}>{averageRating}</p>
        <div
          className={`${style.ratingStarBox} ${style[`ratingStarBox_${mode}`]}`}
        >
          <div className={`${style.star} ${style[`star_${mode}`]}`}>
            {getRatingStars(averageRating, mode)}
          </div>
          <p className={style.ratingCount}>
            {totalRatings.toLocaleString()}개의 후기
          </p>
        </div>
      </div>
    </div>
    <RatingBars className={style.ratingBars} />
    <div className={`${style.ratingButton} ${style[`ratingButton_${mode}`]}`}>
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

const TabletLayout = ({ mode }: { mode: string }) => (
  <div className={`${style.ratingBox} ${style[`ratingBox_${mode}`]}`}>
    <div className={style.leftBox}>
      <div
        className={`${style.ratingStarsInfo} ${style[`ratingStarsInfo_${mode}`]}`}
      >
        <div>
          <div
            className={`${style.ratingAvgBox} ${style[`ratingAvgBox_${mode}`]}`}
          >
            <p className={style.ratingAvg}>{averageRating}</p>
            <div
              className={`${style.ratingStarBox} ${style[`ratingStarBox_${mode}`]}`}
            >
              <div className={`${style.star} ${style[`star_${mode}`]}`}>
                {getRatingStars(averageRating, mode)}
              </div>
              <p className={style.ratingCount}>
                {totalRatings.toLocaleString()}개의 후기
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${style.ratingButton} ${style[`ratingButton_${mode}`]}`}
        >
          <Button
            type="default"
            size="width113"
            color="purple"
            textColor="white"
            text="리뷰 남기기"
          />
        </div>
      </div>
    </div>
    <div className={style.ratingBarsContainer}>
      <RatingBars
        className={`${style.ratingBars} ${style[`ratingBars_${mode}`]}`}
      />
    </div>
  </div>
);

const MobileLayout = ({ mode }: { mode: string }) => (
  <div className={`${style.ratingBox} ${style[`ratingBox_${mode}`]}`}>
    <div className={`${style.rating} ${style[`rating_${mode}`]}`}>
      <div className={style.ratingStarsInfo}>
        <p className={style.ratingAvg_mobile}>{averageRating}</p>
        <div
          className={`${style.ratingStarBox} ${style[`ratingStarBox_${mode}`]}`}
        >
          <div className={`${style.star} ${style[`star_${mode}`]}`}>
            {getRatingStars(averageRating, mode)}
          </div>
          <p className={style.ratingCount}>
            {totalRatings.toLocaleString()}개의 후기
          </p>
        </div>
      </div>
      <div className={`${style.ratingButton} ${style[`ratingButton_${mode}`]}`}>
        <Button
          type="default"
          size="width100"
          color="purple"
          textColor="white"
          text="리뷰 작성하기"
        />
      </div>
    </div>
    <RatingBars className={style.ratingBars} />
  </div>
);

const WineRating = () => {
  const { mode } = useDevice();

  return (
    <div className={`${style.ratingBox} ${style[`ratingBox_${mode}`]}`}>
      {mode === 'desktop' && <DesktopLayout mode={mode} />}
      {mode === 'tablet' && <TabletLayout mode={mode} />}
      {mode === 'mobile' && <MobileLayout mode={mode} />}
    </div>
  );
};

export default WineRating;
