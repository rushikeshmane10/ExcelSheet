import { FaPlus } from "react-icons/fa6";

const GridControls = ({ onAddRow, onAddColumn }) => {
  return (
<div className="flex gap-2">
  <button
    onClick={onAddRow}
    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
  >
    <FaPlus className="text-sm" /> Row
  </button>

  <button
    onClick={onAddColumn}
    className="px-4 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition flex items-center gap-2"
  >
    <FaPlus className="text-sm" /> Column
  </button>
</div>
  );
};

export default GridControls;
