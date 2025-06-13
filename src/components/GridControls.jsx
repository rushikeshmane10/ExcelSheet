

const GridControls = ({ onAddRow, onAddColumn }) => {
  return (
    <div className="mb-2 flex gap-2">
      <button
        onClick={onAddRow}
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        + Add Row
      </button>
      <button
        onClick={onAddColumn}
        className="px-4 py-1 bg-green-500 text-white rounded"
      >
        + Add Column
      </button>
    </div>
  );
};

export default GridControls;
