const Cell = ({ cell, onChange, onSelect, isSelected }) => {
  const handleChange = (e) => onChange(cell.id, e.target.value);
  const handleClick = () => onSelect(cell); 
  return (
    <td
      onClick={handleClick}
      className={`border p-1 w-24 cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        backgroundColor: cell.formatting?.backgroundColor || "transparent",
      }}
    >
      <input
        value={cell.value}
        onChange={handleChange}
        className={`w-full px-1 py-0.5 text-sm outline-none bg-transparent ${
          cell.formatting?.bold ? "font-bold" : ""
        }`}
      />
    </td>
  );
};

export default Cell;
