import React, { useEffect, useState } from 'react';
import style from 'src/logic/catalogPage/CatalogPage.module.scss';
import { Card } from 'src/components/cards/Cards.tsx';
import { Filter } from 'src/components/filter/Filter.tsx';
import { filterTools } from 'src/services/tools/filterTools.ts';
import {
  fetchAllProducts,
  fetchColorProducts,
  fetchPriceProducts,
  fetchSizeProducts,
} from 'src/services/api/filterRequests.ts';
import { ProductProjection } from '@commercetools/platform-sdk';

const initializeFilters = async () => {
  const [colors, sizes, prices] = await filterTools();
  return { colors, sizes, prices };
};

interface FilterOption {
  label: string;
  value: string;
}

interface Filters {
  colors: FilterOption[];
  sizes: FilterOption[];
  prices: FilterOption[];
}

export const Catalog: React.FC = () => {
  const [defaultColor, setDefaultColor] = useState<ProductProjection[]>([]);
  const [productState, setProductState] = useState<ProductProjection[]>([]);
  const [colorsArray, setColorsArray] = useState<string[]>([]);
  const [sizesArray, setSizesArray] = useState<string[]>([]);
  const [pricesArray, setPricesArray] = useState<string[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    colors: [],
    sizes: [],
    prices: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchAllProducts();
        setDefaultColor(result);
        setProductState(result);
      } catch (error: unknown) {
        setErrorState('Error fetching products');
      }
    };
    getProducts().catch(() => {
      setErrorState('Error fetching products');
    });

    const initialize = async () => {
      try {
        const { colors, sizes, prices } = await initializeFilters();
        setFilters({ colors, sizes, prices });
      } catch (error: unknown) {
        setErrorState('Error initializing filters');
      }
    };
    initialize().catch(() => {
      setErrorState('Error initializing filters');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name: category, value } = event.target;

    const handleAsyncChange = async () => {
      if (event.target.checked) {
        if (category === 'color') {
          const updatedColorsArray = [...colorsArray, value];
          setColorsArray(updatedColorsArray);
          try {
            const result = await fetchColorProducts(updatedColorsArray, sizesArray, pricesArray);
            setProductState(result);
          } catch (error: unknown) {
            setErrorState('Error fetching color products');
          }
        }
        if (category === 'size') {
          const updatedSizesArray = [...sizesArray, value];
          setSizesArray(updatedSizesArray);
          try {
            const result = await fetchSizeProducts(updatedSizesArray, colorsArray, pricesArray);
            setProductState(result);
          } catch (error: unknown) {
            setErrorState('Error fetching size products');
          }
        }
        if (category === 'price') {
          const getPrice = async (priceRange: string) => {
            const updatedPricesArray = [value];
            setPricesArray(updatedPricesArray);
            try {
              const result = await fetchPriceProducts(priceRange, colorsArray, sizesArray);
              setProductState(result);
            } catch (error: unknown) {
              setErrorState('Error fetching price products');
            }
          };

          if (value === 'below 75') {
            await getPrice('0 to 7500');
          } else if (value === '75 to 125') {
            await getPrice('7500 to 12500');
          } else if (value === '125 to 200') {
            await getPrice('12500 to 20000');
          } else if (value === '200 to 250') {
            await getPrice('20000 to 25000');
          } else if (value === 'above 250') {
            await getPrice('25000 to 100000000000000');
          }
        }
      } else {
        if (category === 'color') {
          const updatedColorsArray = colorsArray.filter((color) => color !== value);
          setColorsArray(updatedColorsArray);
          try {
            const result =
              updatedColorsArray.length >= 0
                ? await fetchColorProducts(updatedColorsArray, sizesArray, pricesArray)
                : defaultColor;
            setProductState(result);
          } catch (error: unknown) {
            setErrorState('Error fetching color products');
          }
        }
        if (category === 'size') {
          const updatedSizesArray = sizesArray.filter((size) => size !== value);
          setSizesArray(updatedSizesArray);
          try {
            const result =
              updatedSizesArray.length >= 0
                ? await fetchSizeProducts(updatedSizesArray, colorsArray, pricesArray)
                : defaultColor;
            setProductState(result);
          } catch (error: unknown) {
            setErrorState('Error fetching size products');
          }
        }
        if (category === 'price') {
          const updatedPricesArray = pricesArray.filter((price) => price !== value);
          setPricesArray(updatedPricesArray);
          setProductState(defaultColor);
        }
      }
    };

    handleAsyncChange().catch(() => {
      setErrorState('Error handling change');
    });
  };

  const handleReset = (products: ProductProjection[]) => {
    setProductState(products);
    setColorsArray([]);
    setSizesArray([]);
    setPricesArray([]);
  };

  return (
    <div className={style.layout}>
      {errorState && <div className={style.error}>{errorState}</div>}
      <div className={style.dots} />
      <Filter
        colors={filters.colors}
        sizes={filters.sizes}
        prices={filters.prices}
        handleChange={handleChange}
        onReset={handleReset}
      />
      <Card products={productState} />
    </div>
  );
};
