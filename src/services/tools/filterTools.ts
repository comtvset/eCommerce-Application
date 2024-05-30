export const filterTools = () => {
  const colors = [
    { label: 'white', value: 'white' },
    { label: 'red', value: 'red' },
    { label: 'black', value: 'black' },
    { label: 'green', value: 'green' },
    { label: 'yellow', value: 'yellow' },
  ];

  const sizes = [
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
  ];

  const prices = [
    { label: 'below 75', value: 'below 75' },
    { label: '75 to 125', value: '75 to 125' },
    { label: '125 to 200', value: '125 to 200' },
    { label: '200 to 250', value: '200 to 250' },
    { label: 'above 250', value: 'above 250' },
  ];

  return [colors, sizes, prices];
};
