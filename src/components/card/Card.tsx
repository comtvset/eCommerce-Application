import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from 'src/components/card/Card.module.scss';
import { IProductData } from 'src/components/cards/Cards.tsx';
import { Layout } from 'src/components/layout/Layout.tsx';
import { apiRoot } from 'src/services/api/ctpClient.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { getCurrencySymbol } from 'src/utils/CurrencyUtils.ts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Image {
  url: string;
}

export const CardOne: React.FC = () => {
  const [product, setProduct] = useState<IProductData>();
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { id } = useParams<{ id: string }>();

  const handleImageChange = (newImage: Image) => {
    setSelectedImage(newImage);
  };

  const isImages = product?.masterData.staged.masterVariant.images ?? [];
  const isLength = isImages.length > 1;
  const isFirstPrice = product?.masterData.current.masterVariant.prices;
  const isDiscount = isFirstPrice
    ? ((isFirstPrice[0].discounted?.value.centAmount ?? 0) / 100).toFixed(2)
    : '';
  const isNoDiscount = isFirstPrice
    ? ((isFirstPrice[0]?.value.centAmount ?? 0) / 100).toFixed(2).toString()
    : '';
  const isCurrencyCode = isFirstPrice ? isFirstPrice[0].discounted?.value.currencyCode : '';
  const currencyCode = getCurrencySymbol(isCurrencyCode) ?? '';

  useEffect(() => {
    if (typeof id !== 'undefined') {
      apiRoot
        .products()
        .withId({ ID: id })
        .get()
        .execute()
        .then((response) => {
          setProduct(response.body);
          setError(null);
        })
        .catch(() => {
          setError('An error occurred while including product data. Please generate later');
        });
    }
  }, [id]);

  useEffect(() => {
    if (product?.masterData.staged.masterVariant.images?.length) {
      setSelectedImage(product.masterData.staged.masterVariant.images[0]);
    }
  }, [product]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isImages.length,
    slidesToScroll: 1,
  };
  const { dots, infinite, speed, slidesToShow, slidesToScroll } = settings;

  return (
    <Layout className={style.container}>
      {error && <div className={style.error}>{error}</div>}
      {product && (
        <div className={style.product}>
          <div className={style.container_images}>
            <div className={style.main_image}>
              {selectedImage && (
                <img
                  className={style.image}
                  src={selectedImage.url}
                  alt={product.masterData.current.name['en-US']}
                />
              )}
            </div>
            {isLength && (
              <Slider
                dots={dots}
                infinite={infinite}
                speed={speed}
                slidesToShow={slidesToShow}
                slidesToScroll={slidesToScroll}
                className={style.images_container}
                afterChange={(currentSlide: number) => {
                  handleImageChange(isImages[currentSlide]);
                }}
              >
                {product.masterData.staged.masterVariant.images?.map((image) => (
                  <img
                    key={image.url}
                    className={style.images}
                    src={image.url}
                    alt={product.masterData.current.name['en-US']}
                  />
                ))}
              </Slider>
            )}
          </div>
          <div className={style.info}>
            <Paragraph
              tag="h2"
              title={product.masterData.current.name['en-US']}
              className={style.name_thing}
            />
            <Paragraph
              tag="p"
              title={product.masterData.current.description?.['en-US'] ?? ''}
              className={style.description}
            />
            <Paragraph tag="p" title="PRICE" className={style.price} />
            <div className={style.prices}>
              {isFirstPrice?.[0].discounted ? (
                <>
                  <Paragraph
                    tag="p"
                    title={`${currencyCode}${isNoDiscount}`}
                    className={`${style.price_start} ${style.price_sale}`}
                  />
                  <Paragraph
                    tag="p"
                    title={`${currencyCode}${isDiscount} SALE`}
                    className={style.price_finish}
                  />
                </>
              ) : (
                <Paragraph
                  tag="p"
                  title={`${currencyCode}${isNoDiscount}`}
                  className={style.price_start}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
