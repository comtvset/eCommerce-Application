import { apiRoot } from './ctpClient.ts';

export const fetchAllProducts = async () => {
  const response = await apiRoot.productProjections().search().get().execute();
  return response.body.results;
};

export const fetchColorProducts = async (
  colors: string[],
  sizesArray: string[],
  prices: string[],
) => {
  const filters = [];
  const setColor = colors.map((value: string) => `"${value}"`).join(',');

  if (colors.length) {
    filters.push(`variants.attributes.color-item: ${setColor}`);
  }

  if (sizesArray.length > 0) {
    const setSize = sizesArray.map((value: string) => `"${value}"`).join(',');
    filters.push(`variants.attributes.size-item: ${setSize}`);
  }

  if (prices.length > 0) {
    if (prices[0] === 'below 75') {
      filters.push('variants.price.centAmount: range(0 to 7500)');
    } else if (prices[0] === '75 to 125') {
      filters.push('variants.price.centAmount: range(7500 to 12500)');
    } else if (prices[0] === '125 to 200') {
      filters.push('variants.price.centAmount: range(12500 to 20000)');
    } else if (prices[0] === '200 to 250') {
      filters.push('variants.price.centAmount: range(20000 to 25000)');
    } else if (prices[0] === 'above 250') {
      filters.push('variants.price.centAmount: range(25000 to 100000000000000)');
    }
  }

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        filter: filters,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchSizeProducts = async (
  sizes: string[],
  colorsArray: string[],
  prices: string[],
) => {
  const filters = [];
  const setSize = sizes.map((value: string) => `"${value}"`).join(',');

  if (sizes.length) {
    filters.push(`variants.attributes.size-item: ${setSize}`);
  }

  if (colorsArray.length > 0) {
    const setColor = colorsArray.map((value: string) => `"${value}"`).join(',');
    filters.push(`variants.attributes.color-item: ${setColor}`);
  }

  if (prices.length > 0) {
    if (prices[0] === 'below 75') {
      filters.push('variants.price.centAmount: range(0 to 7500)');
    } else if (prices[0] === '75 to 125') {
      filters.push('variants.price.centAmount: range(7500 to 12500)');
    } else if (prices[0] === '125 to 200') {
      filters.push('variants.price.centAmount: range(12500 to 20000)');
    } else if (prices[0] === '200 to 250') {
      filters.push('variants.price.centAmount: range(20000 to 25000)');
    } else if (prices[0] === 'above 250') {
      filters.push('variants.price.centAmount: range(25000 to 100000000000000)');
    }
  }

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        filter: filters,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchPriceProducts = async (
  prices: string,
  colorsArray: string[],
  sizesArray: string[],
) => {
  const filters = [];

  filters.push(`variants.price.centAmount: range(${prices})`);

  if (colorsArray.length > 0) {
    const setColor = colorsArray.map((value: string) => `"${value}"`).join(',');
    filters.push(`variants.attributes.color-item: ${setColor}`);
  }

  if (sizesArray.length > 0) {
    const setSize = sizesArray.map((value: string) => `"${value}"`).join(',');
    filters.push(`variants.attributes.size-item: ${setSize}`);
  }

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: { limit: 30, filter: filters },
    })
    .execute();
  return response.body.results;
};
