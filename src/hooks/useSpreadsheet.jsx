import { useState } from "react";


import { generateCellId } from "../utils/cellUtils";
const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

export const useSpreadsheet = () => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [selectedCell, setSelectedCell] = useState(null);
  const [copiedCell, setCopiedCell] = useState(null);

  const [data, setData] = useState(() =>
    Array.from({ length: DEFAULT_ROWS }, (_, row) =>
      Array.from({ length: DEFAULT_COLS }, (_, col) => ({
        id: generateCellId(row, col),
        value: "",
      }))
    )
  );

  const extractCellRefsFromFormula = (formula) => {
    if (!formula.startsWith("=")) return [];

    const cellPattern = /[A-Z]+[0-9]+/g;
    return formula.match(cellPattern) || [];
  };

  const handleChange = (id, value) => {
    const isFormula = value.startsWith("=");
    const formula = isFormula ? value : "";
    const references = isFormula ? extractCellRefsFromFormula(value) : [];

    const updatedData = data.map((row) =>
      row.map((cell) =>
        cell.id === id
          ? {
              ...cell,
              value,
              formula,
              references,
            }
          : cell
      )
    );
    setData(updatedData);
  };

  const addRow = () => {
    const newRowIndex = data.length;
    const newRow = Array.from({ length: cols }, (_, col) => ({
      id: generateCellId(newRowIndex, col),
      value: "",
      formula: "",
      references: [],
      formatting: {},
    }));
    setData((prev) => [...prev, newRow]);
    setRows((r) => r + 1);
  };

  const addColumn = () => {
    const newColIndex = cols;
    const updatedData = data.map((row, rowIndex) => [
      ...row,
      {
        id: generateCellId(rowIndex, newColIndex),
        value: "",
        formula: "",
        references: [],
        formatting: {},
      },
    ]);
    setData(updatedData);
    setCols((c) => c + 1);
  };

  const applyFormatting = (type, value) => {
    if (!selectedCell) return;

    const updatedData = data.map((row) =>
      row.map((cell) =>
        cell.id === selectedCell.id
          ? {
              ...cell,
              formatting: {
                ...cell.formatting,
                [type]: value,
              },
            }
          : cell
      )
    );

    setData(updatedData);

    const updatedSelected = updatedData
      .flat()
      .find((cell) => cell.id === selectedCell.id);
    setSelectedCell(updatedSelected);
  };

  const handleCopy = () => {
    if (selectedCell) {
      setCopiedCell({
        value: selectedCell.value,
        formula: selectedCell.formula,
        formatting: { ...(selectedCell.formatting || {}) },
      });
    }
  };

  const handlePaste = () => {
    if (!copiedCell || !selectedCell) return;

    const isFormula = copiedCell.value.startsWith("=");
    const formula = isFormula ? copiedCell.formula : "";
    const references = isFormula
      ? extractCellRefsFromFormula(copiedCell.value)
      : [];

    const updatedData = data.map((row) =>
      row.map((cell) =>
        cell.id === selectedCell.id
          ? {
              ...cell,
              value: copiedCell.value,
              formula,
              references,
              formatting: copiedCell.formatting || {},
            }
          : cell
      )
    );

    setData(updatedData);
  };

  return {
    rows,
    cols,
    data,
    selectedCell,
    copiedCell,
    setRows,
    setCols,
    setData,
    setSelectedCell,
    handleChange,
    addRow,
    addColumn,
    applyFormatting,
    handleCopy,
    handlePaste,
  };
};
