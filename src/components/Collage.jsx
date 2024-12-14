import React, { useRef } from 'react';
import { getRandomColor } from '../utils/colors';

function Collage({ images, title, titlePosition, onDownload, index }) {
  const collageRef = useRef();
  const randomColor = getRandomColor();

  const getTitleStyle = () => {
    const base = {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      padding: '10px 20px',
      backgroundColor: randomColor,
      borderRadius: '4px',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      zIndex: 10,
    };

    switch (titlePosition) {
      case 'top':
        return { ...base, top: '20px' };
      case 'middle':
        return { ...base, top: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom':
        return { ...base, bottom: '20px' };
      default:
        return base;
    }
  };

  return (
    <div className="relative mb-8">
      <div
        ref={collageRef}
        data-collage
        className="relative w-[800px] h-[600px] bg-gray-100 overflow-hidden"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 h-full">
          {images.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={img}
                alt={`Collage image ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                }}
              />
            </div>
          ))}
        </div>
        <div style={getTitleStyle()}>{title}</div>
      </div>
      <button
        onClick={() => onDownload(collageRef.current, index)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Download Collage {index + 1}
      </button>
    </div>
  );
}

export default Collage;