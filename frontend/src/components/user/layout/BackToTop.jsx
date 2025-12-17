// src/components/common/BackToTop.jsx
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-blue-600 text-white
        shadow-lg shadow-blue-600/30
        flex items-center justify-center
        transition-all duration-300
        hover:bg-blue-700 hover:-translate-y-1
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
      `}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
