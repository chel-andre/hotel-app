import React from 'react';
import { Star, StarBorder } from '@mui/icons-material';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const rate = rating || 0;
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} style={{color: "#ffc107"}} />
      ))}
      {hasHalfStar && <StarBorder key="half" style={{color: "#ffc107"}} />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorder key={`empty-${index}`} style={{color: "#ffc107"}} />
      ))}
    </div>
  );
};

export default StarRating;
