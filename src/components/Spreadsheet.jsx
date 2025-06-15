import React, { useEffect, useMemo, useState } from "react";
import Cell from "./Cell";
import GridControls from "./GridControls";
import FormattingToolbar from "./FormattingToolbar";
import { generateCellId, getColumnLetter } from "../utils/cellUtils";
import FileControls from "./FileControls";
import CopyPasteControls from "./CopyPasteControls";
import { useSpreadsheet } from "../hooks/useSpreadsheet.JSX";

const Spreadsheet = () => {
  const {
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
  } = useSpreadsheet();

  const renderedHeaders = useMemo(() => {
    const selectedColLetter = selectedCell
      ? selectedCell.id.match(/[A-Z]+/)[0]
      : null;

    return (
      <>
        <th className="sticky left-0 z-10 bg-gray-100 border border-gray-300 p-2 text-center shadow-sm"></th>
        {Array.from({ length: cols }, (_, colIndex) => {
          const colLetter = getColumnLetter(colIndex);
          const isSelectedCol = colLetter === selectedColLetter;

          return (
            <th
              key={colIndex}
              className={`border border-gray-300 p-2 text-center shadow-sm transition-colors ${
                isSelectedCol
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "bg-gray-100"
              }`}
            >
              {colLetter}
            </th>
          );
        })}
      </>
    );
  }, [cols, selectedCell]);

  const renderedBody = useMemo(() => {
    const selectedRowNumber = selectedCell
      ? parseInt(selectedCell.id.match(/\d+/)[0], 10)
      : null;

    return data.map((row, rowIndex) => {
      const isSelectedRow = selectedRowNumber === rowIndex + 1;

      return (
        <tr key={rowIndex} className="even:bg-gray-50">
          <th
            className={`sticky left-0 z-10 border border-gray-300 p-2 text-center text-gray-500 transition-colors ${
              isSelectedRow
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "bg-gray-50"
            }`}
          >
            {rowIndex + 1}
          </th>
          {row.map((cell) => (
            <Cell
              key={cell.id}
              cell={cell}
              data={data}
              onChange={handleChange}
              onSelect={setSelectedCell}
              isSelected={selectedCell?.id === cell.id}
            />
          ))}
        </tr>
      );
    });
  }, [data, selectedCell?.id]);

  return (
    <div className="">
      <div className="flex  items-center gap-4">
        <FileControls
          rows={rows}
          cols={cols}
          data={data}
          setRows={setRows}
          setCols={setCols}
          setData={setData}
        />

        <GridControls onAddRow={addRow} onAddColumn={addColumn} />
        <FormattingToolbar
          onFormat={applyFormatting}
          selectedCell={selectedCell}
        />
        <CopyPasteControls
          onCopy={handleCopy}
          onPaste={handlePaste}
          isPasteDisabled={!copiedCell || !selectedCell}
        />
      </div>
      <div className="bg-white rounded-xl shadow-xl p-4 overflow-auto border border-gray-300">
        <table className="table-fixed border-separate border-spacing-0 min-w-max w-full text-sm font-medium text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-gray-700">{renderedHeaders}</tr>
          </thead>
          <tbody>{renderedBody}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
