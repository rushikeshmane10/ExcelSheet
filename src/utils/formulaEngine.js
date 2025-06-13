import { getColumnLetter } from './cellUtils';

export const parseCellId = (id) => {
  const match = id.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const [, col, row] = match;
  const colIndex = col
    .split('')
    .reduce((acc, char, i) => acc * 26 + (char.charCodeAt(0) - 64), 0) - 1;
  return { row: parseInt(row, 10) - 1, col: colIndex };
};

export const getRange = (start, end) => {
  const startPos = parseCellId(start);
  const endPos = parseCellId(end);
  if (!startPos || !endPos) return [];

  const cells = [];
  for (let r = startPos.row; r <= endPos.row; r++) {
    for (let c = startPos.col; c <= endPos.col; c++) {
      cells.push({ row: r, col: c });
    }
  }
  return cells;
};

import { getRange } from './cellUtils';
import { parseCellId } from './cellUtils';

export const evaluateFormula = (formula, data) => {
  if (!formula.startsWith('=')) return formula;

  try {
    const expression = formula.slice(1).trim(); // Remove '='
    const [fn, argsStr] = expression.split(/\((.*)\)/).filter(Boolean);
    const fnName = fn.toUpperCase();

    if (!['SUM', 'AVERAGE'].includes(fnName)) return '#ERR';
    if (!argsStr) return '#ERR';

    const args = argsStr.split(',').map((s) => s.trim());

    const values = args.flatMap((arg) => {
      // Support range like A1:A5
      if (arg.includes(':')) {
        const [start, end] = arg.split(':');
        const rangeCells = getRange(start.trim(), end.trim());
        return rangeCells.map(({ row, col }) => {
          const cell = data[row]?.[col];
          const val = parseFloat(cell?.computedValue ?? cell?.value ?? 0);
          return isNaN(val) ? 0 : val;
        });
      }

      // Support single cell ID
      if (/^[A-Z]+[0-9]+$/i.test(arg)) {
        const { row, col } = parseCellId(arg) || {};
        const cell = data[row]?.[col];
        const val = parseFloat(cell?.computedValue ?? cell?.value ?? 0);
        return isNaN(val) ? 0 : val;
      }

      // Support literal value (e.g., 1, 2.5)
      const literal = parseFloat(arg);
      return isNaN(literal) ? 0 : literal;
    });

    if (fnName === 'SUM') return values.reduce((a, b) => a + b, 0);
    if (fnName === 'AVERAGE') return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

    return '#ERR';
  } catch (err) {
    console.error('Formula error:', err);
    return '#ERR';
  }
};

