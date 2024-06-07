import { fetchAllProducts } from 'src/services/api/filterRequests.ts';

interface Attribute {
  name: string;
  value: string[];
}

interface Product {
  masterVariant?: {
    attributes?: Attribute[];
  };
}

export const filterTools = async () => {
  let allColors: string[] = [];
  let allSizes: string[] = [];

  const productsAll: Product[] = await fetchAllProducts();

  productsAll.forEach((product) => {
    product.masterVariant?.attributes?.forEach((attribute) => {
      if (attribute.name === 'color-item') {
        allColors = allColors.concat(attribute.value);
      } else if (attribute.name === 'size-item') {
        allSizes = allSizes.concat(attribute.value);
      }
    });
  });

  const uniqueColors = [...new Set(allColors)];
  const colors = uniqueColors.map((color) => ({ label: color, value: color }));

  const uniqueSizes = [...new Set(allSizes)];
  const sizes = uniqueSizes.map((size) => ({ label: size, value: size }));

  const prices = [
    { label: 'below 75', value: 'below 75' },
    { label: '75 to 125', value: '75 to 125' },
    { label: '125 to 200', value: '125 to 200' },
    { label: '200 to 250', value: '200 to 250' },
    { label: 'above 250', value: 'above 250' },
  ];

  return [colors, sizes, prices];
};
