// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
// This function is very difficult to read and understand
export const moneyFormatter = (
  amount: number,
  currencyDisplayText = '$',
  decimalCount = 2,
  thousands = ',',
  decimal = '.'
) => {
  try {
    const number = amount / 100;
    const negativeSign = number < 0 ? '-' : '';
    const numberAsString = Math.abs(Number(number) || 0).toFixed(decimalCount);
    const numberAsInt = parseInt(numberAsString);

    const i = numberAsInt.toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return `${currencyDisplayText} ${negativeSign}${j ? i.substr(0, j) + thousands : ''}${i
      .substr(j)
      .replace(/(\d{3})(?=\d)/g, `$1${thousands}`)}${
      decimalCount
        ? decimal +
          Math.abs(Number(numberAsString) - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : ''
    }`;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
