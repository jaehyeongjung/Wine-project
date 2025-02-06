import { useEffect, useState } from 'react';

const useDevice = () => {
  const [windowWidth, setwindowWidth] = useState(0);
  const [mode, setMode] = useState('');

  useEffect(() => {
    setwindowWidth(window.innerWidth);

    const updateMode = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setMode('mobile');
      } else if (width < 1200) {
        setMode('tablet');
      } else {
        setMode('desktop');
      }
    };

    updateMode();

    window.addEventListener('resize', updateMode);

    return () => {
      window.removeEventListener('resize', updateMode);
    }; //클린업 함수, 언마운트 될 때 실행됨.
  }, []);

  return { mode };
};

export default useDevice;
