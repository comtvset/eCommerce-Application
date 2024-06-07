enum CurrencySymbol {
  USD = '$',
  EUR = '€',
  GBP = '£',
}

export const getCurrencySymbol = (currencyCode: string | undefined): string | undefined => {
  return currencyCode ? CurrencySymbol[currencyCode as keyof typeof CurrencySymbol] : undefined;
};
