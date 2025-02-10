import Image from 'next/image';

interface Props {
  onClick: () => void;
  filled: boolean;
}

export default function ModalStarRating({ onClick, filled }: Props) {
  return (
    <div>
      <Image
        onClick={onClick}
        src={filled ? '/icons/starColor.svg' : '/icons/star.svg'}
        width={23}
        height={22}
        alt="별점"
      />
    </div>
  );
}
