import React, { useState } from 'react';
import Spinner from 'src/components/spinnerImage/SpinnerImage.tsx';
import style from 'src/components/spinnerImage/ImageWithLoader.module.scss';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={style.imageContainer}>
      {loading && <Spinner />}
      <img
        className={className}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default ImageWithLoader;
