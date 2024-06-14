import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from 'src/components/card/Card.module.scss';
import { Layout } from 'src/components/layout/Layout.tsx';
import { Modal } from 'src/components/modalWindow/modalImage.tsx';
import { Paragraph } from 'src/components/text/Text.tsx';
import { getCurrencySymbol } from 'src/utils/CurrencyUtils.ts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductCatalogData } from '@commercetools/platform-sdk';
import { createApiRoot } from 'src/services/api/BuildClient.ts';
import { Button } from 'src/components/button/Button.tsx';
import { addProduct, deleteProductOnProductPage } from 'src/utils/BasketUtils.ts';

interface Image {
  url: string;
}

interface IProductData {
  id: string;
  masterData: ProductCatalogData;
}

const apiRoot = createApiRoot();

export const CardOne: React.FC = () => {
  const [product, setProduct] = useState<IProductData>();
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleImageChange = (newImage: Image, index: number) => {
    setSelectedImage(newImage);
    setSelectedIndex(index);
  };

  const showModalWindow = () => {
    setModal(true);
  };

  const closeModalWindow = () => {
    setModal(false);
  };

  const handleDeleteProduct = async (idProduct: string) => {
    await deleteProductOnProductPage(idProduct, (message) => {
      setResponseStatus(message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });
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
  const isCurrencyNoDiscount = isFirstPrice ? isFirstPrice[0].value.currencyCode : '';
  const currencyCode = getCurrencySymbol(isCurrencyCode) ?? '';
  const currencyNoDiscount = getCurrencySymbol(isCurrencyNoDiscount) ?? '';
  const isDisabled = localStorage.getItem('isInBasket');

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

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isImages.length,
    slidesToScroll: 1,
  };
  const { dots, infinite, speed, slidesToShow, slidesToScroll } = settings;

  const settings2 = {
    initialSlide: selectedIndex,
    dot: true,
    infinit: true,
    spee: 500,
    slidesToSho: 1,
    slidesToScrol: 1,
  };
  const { initialSlide, dot, infinit, spee, slidesToSho, slidesToScrol } = settings2;

  return (
    <Layout className={style.container}>
      {error && <div className={style.error}>{error}</div>}
      {product && (
        <div className={style.product}>
          <div className={style.container_images}>
            <div className={style.main_image}>
              {selectedImage && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={showModalWindow}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      showModalWindow();
                    }
                  }}
                >
                  <img
                    className={style.image}
                    src={selectedImage.url}
                    alt={product.masterData.current.name['en-US']}
                  />
                </div>
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
                  handleImageChange(isImages[currentSlide], selectedIndex);
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
                  title={`${currencyNoDiscount}${isNoDiscount}`}
                  className={style.price_start}
                />
              )}
            </div>
            <div className={style.buttons}>
              <Button
                className={`${style.button__add} ${isDisabled === 'true' ? style.disabled : ''}`}
                title="ADD TO CART"
                disabled={isDisabled === 'true' || isButtonDisabled}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (isDisabled === 'true') {
                    e.preventDefault();
                    return;
                  }
                  (async () => {
                    if (id) {
                      setIsButtonDisabled(true);
                      await addProduct(id);
                      localStorage.setItem('isInBasket', 'true');
                      setIsButtonDisabled(false);
                    }
                  })();
                }}
              />
              <Button
                className={`${style.button__remove} ${isDisabled !== 'true' ? style.disabled : ''}`}
                title="REMOVE FROM CART"
                disabled={isDisabled !== 'true' || isButtonDisabled}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (isDisabled !== 'true') {
                    e.preventDefault();
                    return;
                  }
                  (async () => {
                    if (id) {
                      setIsButtonDisabled(true);
                      await handleDeleteProduct(id);
                      localStorage.setItem('isInBasket', 'false');
                      setIsButtonDisabled(false);
                    }
                  })();
                }}
              />
              {showMessage && <div className={style.message__remove}>{responseStatus}</div>}
            </div>
          </div>
        </div>
      )}
      {product && selectedImage && modal && (
        <Modal closeModalWindow={closeModalWindow}>
          {!isLength && (
            <img
              className={style.modal_image}
              src={selectedImage.url}
              alt={product.masterData.current.name['en-US']}
            />
          )}
          {isLength && (
            <Slider
              initialSlide={initialSlide}
              dots={dot}
              infinite={infinit}
              speed={spee}
              slidesToShow={slidesToSho}
              slidesToScroll={slidesToScrol}
              className={style.images_container2}
              afterChange={(currentSlide) => {
                handleImageChange(isImages[currentSlide], currentSlide);
              }}
            >
              {product.masterData.staged.masterVariant.images?.map((image) => (
                <img
                  key={image.url}
                  className={style.images2}
                  src={image.url}
                  alt={product.masterData.current.name['en-US']}
                />
              ))}
            </Slider>
          )}
        </Modal>
      )}
      {modal && <div className={style.background} />}
    </Layout>
  );
};
