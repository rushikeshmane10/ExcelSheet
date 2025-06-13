const Cell = ({ cell, onChange }) => {
  return (
    <td className="border p-1 min-w-[100px]">
      <input
        type="text"
        value={cell.value}
        onChange={(e) => onChange(cell.id, e.target.value)}
        className="w-full outline-none bg-transparent"
      />
      {cell.value.startsWith('=') && (
        <div className="text-xs text-gray-500">{cell.computedValue}</div>
      )}
    </td>
  );
};

export default Cell;
