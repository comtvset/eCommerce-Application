import { apiRoot } from './ctpClient.ts';

export const fetchAllProducts = async () => {
  const response = await apiRoot.productProjections().search().get().execute();
  return response.body.results;
};

export const fetchColorProducts = async (colors: string[]) => {
  const setColor = colors.map((value: string) => `"${value}"`).join(',');
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        filter: `variants.attributes.color-item: ${setColor}`,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchSizeProducts = async (sizes: string[]) => {
  const setSize = sizes.map((value: string) => `"${value}"`).join(',');
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        filter: `variants.attributes.size-item: ${setSize}`,
      },
    })
    .execute();
  return response.body.results;
};

export const fetchPriceProducts = async (prices: string) => {
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: { filter: `variants.price.centAmount: range(${prices})` },
    })
    .execute();
  return response.body.results;
};
