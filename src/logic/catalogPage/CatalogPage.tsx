import React, { useEffect, useState } from 'react';
import style from 'src/logic/catalogPage/CatalogPage.module.scss';
import { Card } from 'src/components/cards/Cards.tsx';
import { Filter } from 'src/components/filter/Filter.tsx';
import { filterTools } from 'src/services/tools/filterTools.ts';
import {
  fetchAllProducts,
  fetchCategory,
  fetchColorProducts,
  fetchPriceProducts,
  fetchSearchProducts,
  fetchSizeProducts,
  fetchSortNameProducts,
  fetchSortPriceProducts,
} from 'src/services/api/filterRequests.ts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { SearchComponent } from 'src/components/search/Search.tsx';
import { SortComponent } from 'src/components/sort/Sort.tsx';
import { CategoryComponent } from 'src/components/category/Category.tsx';

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

const Catalog: React.FC = () => {
  const [defaultColor, setDefaultColor] = useState<ProductProjection[]>([]);
  const [productState, setProductState] = useState<ProductProjection[]>([]);
  const [colorsArray, setColorsArray] = useState<string[]>([]);
  const [sizesArray, setSizesArray] = useState<string[]>([]);
  const [pricesArray, setPricesArray] = useState<string[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All category');

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
    setSelectedCategory('All category');
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

  const handleSearch = (query: string) => {
    setSelectedCategory('All category');
    const fetchAndSetProducts = async () => {
      try {
        const searchProducts = await fetchSearchProducts(query);
        setProductState(searchProducts);
      } catch (error: unknown) {
        setErrorState('Error searching products');
      }
    };

    fetchAndSetProducts().catch(() => {
      setErrorState('Error handling change');
    });
  };

  const handleSort = (criteria: string) => {
    setSelectedCategory('All category');
    if (criteria === 'price high') {
      const fetchAndSetProducts = async () => {
        try {
          const sortPriceProducts = await fetchSortPriceProducts('desc');
          setProductState(sortPriceProducts);
        } catch (error: unknown) {
          setErrorState('Error searching products');
        }
      };

      fetchAndSetProducts().catch(() => {
        setErrorState('Error handling change');
      });
    }
    if (criteria === 'price low') {
      const fetchAndSetProducts = async () => {
        try {
          const sortPriceProducts = await fetchSortPriceProducts('asc');
          setProductState(sortPriceProducts);
        } catch (error: unknown) {
          setErrorState('Error searching products');
        }
      };

      fetchAndSetProducts().catch(() => {
        setErrorState('Error handling change');
      });
    }
    if (criteria === 'name a-z') {
      const fetchAndSetProducts = async () => {
        try {
          const sortNameProducts = await fetchSortNameProducts('asc');
          setProductState(sortNameProducts);
        } catch (error: unknown) {
          setErrorState('Error searching products');
        }
      };

      fetchAndSetProducts().catch(() => {
        setErrorState('Error handling change');
      });
    }
    if (criteria === 'name z-a') {
      const fetchAndSetProducts = async () => {
        try {
          const sortNameProducts = await fetchSortNameProducts('desc');
          setProductState(sortNameProducts);
        } catch (error: unknown) {
          setErrorState('Error searching products');
        }
      };

      fetchAndSetProducts().catch(() => {
        setErrorState('Error handling change');
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const fetchAndSetCategory = async () => {
      try {
        const currentCategory = await fetchCategory(category);
        setProductState(currentCategory);
      } catch (error: unknown) {
        setErrorState('Error searching products');
      }
    };

    fetchAndSetCategory().catch(() => {
      setErrorState('Error handling change');
    });
  };

  return (
    <>
      {errorState && <div className={style.error}>{errorState}</div>}
      <div className={style.dots} />
      <SearchComponent onSearch={handleSearch} />
      <div className={style.layout}>
        <div className={style.test}>
          <CategoryComponent
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
          <SortComponent onSort={handleSort} />
          <Filter
            colors={filters.colors}
            sizes={filters.sizes}
            prices={filters.prices}
            handleChange={handleChange}
            onReset={handleReset}
          />
        </div>
        <Card products={productState} />
      </div>
    </>
  );
};
export default Catalog;
