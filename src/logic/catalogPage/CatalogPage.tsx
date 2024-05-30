import style from 'src/logic/catalogPage/CatalogPage.module.scss';
import { Card } from 'src/components/cards/Cards.tsx';
import { ProductCatalogData } from '@commercetools/platform-sdk';
import { Filter } from 'src/components/filter/Filter.tsx';
import { filterTools } from 'src/services/tools/filterTools.ts';

export interface IProductData {
  id: string;
  masterData: ProductCatalogData;
}

const [colors, sizes, prices] = filterTools();

export const Catalog: React.FC = () => {
  return (
    <div className={style.layout}>
      <div className={style.dots} />
      <Filter colors={colors} sizes={sizes} prices={prices} />
      <Card />
    </div>
  );
};
