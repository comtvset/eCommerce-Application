import React, { useState, useEffect, useRef } from 'react';
import Spinner from 'src/components/spinnerImage/SpinnerImage.tsx';
import style from 'src/components/spinnerImage/ImageWithLoader.module.scss';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  const [loadedSrc, setLoadedSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoadedSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' },
    );

    const currentImgRef = imgRef.current;

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [src]);

  return (
    <div className={style.imageContainer}>
      {loading && <Spinner />}
      <img
        ref={imgRef}
        className={className}
        src={loadedSrc}
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
