import React, { useEffect, useState /* , useRef */ } from 'react';
import { useParams } from 'react-router-dom';
import style from 'src/components/card/Card.module.scss';
import { Layout } from 'src/components/layout/Layout.tsx';
import { apiRoot } from 'src/services/api/ctpClient.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { IProductData } from 'src/components/cards/Cards.tsx';

export const CardOne: React.FC = () => {
  const [product, setProduct] = useState<IProductData>();
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  //  const isFirstRender = useRef(true);

  useEffect(() => {
    /* if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } */

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

  return (
    <Layout className={style.container}>
      {error && <div className={style.error}>{error}</div>}
      {product && (
        <div className={style.product}>
          <div className={style.container_images}>
            <div className={style.main_image}>
              <img
                className={style.image}
                src={product.masterData.staged.masterVariant.images?.[0].url}
                alt={product.masterData.current.name['en-US']}
              />
            </div>
            <div className={style.images_container}>
              {product.masterData.staged.masterVariant.images?.map((image) => {
                return (
                  <img
                    key={image.url}
                    className={style.images}
                    src={image.url}
                    alt={product.masterData.current.name['en-US']}
                  />
                );
              })}
            </div>
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
            <Paragraph tag="p" title="price" className={style.description} />
          </div>
        </div>
      )}
    </Layout>
  );
};
