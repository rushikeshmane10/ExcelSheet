import { evaluateFormula } from "../utils/formulaEngine";

const Cell = ({ cell, data, onChange, onSelect, isSelected }) => {
  const handleChange = (e) => onChange(cell.id, e.target.value);
  const handleClick = () => onSelect(cell);
  return (
    <td
      onClick={handleClick}
      className={`relative border border-gray-300 w-24 h-10 p-1 cursor-pointer transition-all duration-150 ease-in-out
    ${
      isSelected
        ? "z-10 bg-white ring-2 ring-blue-500 shadow-md border-blue-400"
        : "hover:bg-blue-50"
    }`}
      style={{
        backgroundColor:
          cell.formatting?.backgroundColor ||
          (isSelected ? "white" : "transparent"),
      }}
    >
      <input
        value={
          isSelected
            ? cell.value
            : cell.formula
            ? evaluateFormula(cell.formula, data)
            : cell.value
        }
        onChange={handleChange}
        className={`w-full h-full px-1 py-0.5 text-sm outline-none bg-transparent ${
          cell.formatting?.bold ? "font-bold" : ""
        }`}
      />
    </td>
  );
};

export default Cell;
