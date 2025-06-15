
export const parseCellId = (id) => {
  const match = id.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const [, col, row] = match;
  const colIndex =
    col
      .split("")
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

export const evaluateFormula = (formula, data) => {
  if (!formula.startsWith("=")) return formula;
  try {
    const expression = formula.slice(1).trim(); 
    const [fn, argsStr] = expression.split(/\((.*)\)/).filter(Boolean);
    const fnName = fn.toUpperCase();

    if (!["SUM", "AVERAGE"].includes(fnName)) return "#ERR";
    if (!argsStr) return "#ERR";

    const args = argsStr.split(",").map((s) => s.trim());

    const values = args.flatMap((arg) => {
      if (arg.includes(":")) {
        const [start, end] = arg.split(":");
        const rangeCells = getRange(start.trim(), end.trim());
        return rangeCells.map(({ row, col }) => {
          const cell = data[row]?.[col];
          const val = parseFloat(cell?.value ?? 0);
          return isNaN(val) ? 0 : val;
        });
      }

      if (/^[A-Z]+[0-9]+$/i.test(arg)) {
        const { row, col } = parseCellId(arg) || {};
        const cell = data[row]?.[col];
        const val = parseFloat(cell?.value ?? 0);
        return isNaN(val) ? 0 : val;
      }

      const literal = parseFloat(arg);
      return isNaN(literal) ? 0 : literal;
    });

    if (fnName === "SUM") return values.reduce((a, b) => a + b, 0);
    if (fnName === "AVERAGE")
      return values.length
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 0;

    return "#ERR";
  } catch (err) {
    console.error("Formula error:", err);
    return "#ERR";
  }
};



