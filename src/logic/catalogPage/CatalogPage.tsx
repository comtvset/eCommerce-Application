import style from 'src/logic/catalogPage/CatalogPage.module.scss';
import { Card } from 'src/components/cards/Cards.tsx';
import { ProductCatalogData } from '@commercetools/platform-sdk';

export interface IProductData {
  id: string;
  masterData: ProductCatalogData;
}

export const Catalog: React.FC = () => {
  return (
    <div className={style.layout}>
      <div className={style.dots} />
      <Card />
    </div>
  );
};
