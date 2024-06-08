import { apiRoot } from './ctpClient.ts';

export const fetchAllProducts = async () => {
  const response = await apiRoot.productProjections().search().get().execute();
  return response.body.results;
};

export const fetchCategory = async (category: string) => {
  let filter = '';

  if (category === 'Decor') {
    filter = 'categories.id: subtree("59dbad07-067b-46ef-b62e-c6d5eddc2128")';
  }
  if (category === 'Wall Decor') {
    filter = 'categories.id: subtree("043c187b-e2e2-42f4-b7e9-e11e441cbee8")';
  }
  if (category === 'X-mas') {
    filter = 'categories.id: subtree("c7f2242d-4ade-4049-b23c-3aeb238580cc")';
  }
  if (category === 'Toys') {
    filter = 'categories.id: subtree("28b63001-0763-48c2-96e5-fbda8effc91b")';
  }
  if (category === 'Food') {
    filter = 'categories.id: subtree("ed2eba2a-1ebf-4295-ac7f-1080f469fa7d")';
  }
  if (category === 'Jar') {
    filter = 'categories.id: subtree("d32d17fe-3bda-460e-8494-9e50c9ca5a10")';
  }

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': [filter],
      },
    })
    .execute();
  return response.body.results;
};

export const fetchSearchProducts = async (query: string) => {
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en-US': query,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchSortPriceProducts = async (value: string) => {
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        sort: `price ${value}`,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchSortNameProducts = async (value: string) => {
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        sort: `name.en-US ${value}`,
      },
    })
    .execute();
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
