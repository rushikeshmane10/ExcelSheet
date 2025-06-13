export function getColumnLetter(index) {
  let str = "";
  while (index >= 0) {
    str = String.fromCharCode((index % 26) + 65) + str;
    index = Math.floor(index / 26) - 1;
  }
  return str;
}

export function generateCellId(row, col) {
  return `${getColumnLetter(col)}${row + 1}`;
}
