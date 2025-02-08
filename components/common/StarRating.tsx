import React from 'react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 24,
}) => {
  return (
    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
      {[...Array(totalStars)].map((_, index) => (
        <img
          key={index}
          src={index < rating ? '/icons/starColor.svg' : '/icons/star.svg'}
          alt="별점"
          width={size}
          height={size}
        />
      ))}
    </div>
  );
};

export default StarRating;
