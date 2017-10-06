export function numberToCurrency(price, unit = ' đ', delimiter = ',') {
  if(price) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter) + unit
  } else {
    return price
  }
}