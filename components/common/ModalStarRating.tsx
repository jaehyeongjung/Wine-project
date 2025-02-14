import Image from 'next/image';

interface Props {
  rating: number;
  setRating: (value: number) => void;
}

export default function ModalStarRating({ rating, setRating }: Props) {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <Image
          key={index}
          onClick={() => setRating(index + 1)}
          src={index < rating ? '/icons/starColor.svg' : '/icons/star.svg'}
          width={23}
          height={22}
          alt="별점"
        />
      ))}
    </div>
  );
}
