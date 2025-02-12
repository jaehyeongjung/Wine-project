import React from 'react';
import classNames from 'classnames';
import style from './wineRating.module.css';
import Button from '../../components/common/Button';
import useDevice from '../../hooks/useDevice';

const avgRatings = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
const totalRatings = Object.values(avgRatings).reduce(
  (acc, count) => acc + count,
  0,
);
const averageRating = 4.8;

const getRatingStars = (rating: number) => {
  const stars = Math.floor(rating);
  return Array.from({ length: 5 }, (_, i) => (
    <img
      key={i}
      src={i < stars ? '/icons/stars.png' : '/icons/empty-stars.png'}
      alt={i < stars ? 'full star' : 'empty star'}
      className={style.starImage}
    />
  ));
};

const RatingBars = () => (
  <div className={style.ratingBars}>
    {Object.entries(avgRatings)
      .reverse()
      .map(([score, count]) => (
        <div key={score} className={style.ratingRow}>
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

const DesktopLayout = () => (
  <>
    <div className={style.rating}>
      <p className={style.ratingAvg}>{averageRating}</p>
      <div className={style.ratingStarsBox}>
        <p>{getRatingStars(averageRating)}</p>
        <p className={style.ratingCount}>
          {totalRatings.toLocaleString()}개의 후기
        </p>
      </div>
    </div>
    <RatingBars />
    <div className={style.ratingButton}>
      <Button
        type="default"
        size="width113"
        color="purple"
        textColor="white"
        text="리뷰 남기기"
      />
    </div>
  </>
);

const TabletLayout = () => (
  <div className={style.ratingBox}>
    <div className={style.rating}>
      <p className={style.ratingAvg}>{averageRating}</p>
      <Button
        type="default"
        size="width113"
        color="purple"
        textColor="white"
        text="리뷰 남기기"
      />
      <div className={style.ratingStarsBox}>
        <p>{getRatingStars(averageRating)}</p>
        <p className={style.ratingCount}>
          {totalRatings.toLocaleString()}개의 후기
        </p>
      </div>
    </div>
    <RatingBars />
  </div>
);

const MobileLayout = () => (
  <>
    <div className={style.rating}>
      <div>
        <p className={style.ratingAvg}>{averageRating}</p>
        <div className={style.ratingStarsBox}>
          <p>{getRatingStars(averageRating)}</p>
          <p className={style.ratingCount}>
            {totalRatings.toLocaleString()}개의 후기
          </p>
        </div>
      </div>
      <div className={style.ratingButton_mobile}>
        <Button
          type="default"
          size="width40"
          color="purple"
          textColor="white"
          text="리뷰 작성하기"
        />
      </div>
    </div>
    <RatingBars />
  </>
);

const WineRating = () => {
  const { mode } = useDevice();
  return (
    <div
      className={classNames(
        style.ratingBox,
        style.rating, // 항상 적용할 스타일
        style[`ratingBox_${mode}`], // mode에 따라 동적으로 변경
        { [style.mobileStyle]: mode === 'mobile' }, // 모바일일 때만 추가할 스타일
      )}
    >
      {mode === 'desktop' && <DesktopLayout />}
      {mode === 'tablet' && <TabletLayout />}
      {mode === 'mobile' && <MobileLayout />}
    </div>
  );
};

export default WineRating;
