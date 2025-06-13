import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import GridControls from "./GridControls";
import { generateCellId, getColumnLetter } from "../utils/cellUtils";
import { evaluateFormula } from "../utils/formulaEngine";

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

const Spreadsheet = () => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [data, setData] = useState(() =>
    Array.from({ length: DEFAULT_ROWS }, (_, row) =>
      Array.from({ length: DEFAULT_COLS }, (_, col) => ({
        id: generateCellId(row, col),
        value: "",
        computedValue: "",
      }))
    )
  );


const handleChange = (id, value) => {
  
  const newData = data.map((row) =>
    row.map((cell) =>
      cell.id === id ? { ...cell, value } : cell
    )
  );

 
  const updatedData = newData.map((row) =>
    row.map((cell) => {
      const computedValue = cell.value.startsWith('=')
        ? evaluateFormula(cell.value, newData)
        : cell.value;
      return { ...cell, computedValue };
    })
  );

  setData(updatedData);
};


//  useEffect(() => {
//   setData((prevData) =>
//     prevData.map((row) =>
//       row.map((cell) => {
//         const computedValue = cell.value.startsWith("=")
//           ? evaluateFormula(cell.value, prevData)
//           : cell.value;
//         return { ...cell, computedValue };
//       })
//     )
//   );
// }, [
//   data.length,
//   rows,
//   cols,
//   JSON.stringify(data.map((row) => row.map((c) => c.value))),
// ]);


  const addRow = () => {
    const newRowIndex = data.length;
    const newRow = Array.from({ length: cols }, (_, col) => ({
      id: generateCellId(newRowIndex, col),
      value: "",
      computedValue: "",
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
        computedValue: "",
      },
    ]);
    setData(updatedData);
    setCols((c) => c + 1);
  };

  return (
    <div className="p-4">
      <GridControls onAddRow={addRow} onAddColumn={addColumn} />

      <div className="overflow-x-auto max-w-full">
        <table className="table-auto border-collapse min-w-max">
          <thead>
            <tr>
              <th className="border p-1 bg-gray-100"></th>
              {Array.from({ length: cols }, (_, colIndex) => (
                <th key={colIndex} className="border p-1 bg-gray-100">
                  {getColumnLetter(colIndex)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border p-1 bg-gray-100">{rowIndex + 1}</th>
                {row.map((cell) => (
                  <Cell key={cell.id} cell={cell} onChange={handleChange} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
