const FormattingToolbar = ({ onFormat, selectedCell }) => {
  const isBold = selectedCell?.formatting?.bold || false;

  return (
    <div className=" flex gap-4 items-center">
      <button
        onClick={() => onFormat("bold", !isBold)}
        className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-bold transition 
    ${
      isBold
        ? "bg-gray-300 border-gray-500 text-black shadow-inner"
        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
    }`}
        title="Bold (Ctrl+B)"
      >
        B
      </button>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={
            selectedCell?.formatting?.backgroundColor
              ? selectedCell.formatting.backgroundColor
              : "#ffffff"
          }
          onChange={(e) => onFormat("backgroundColor", e.target.value)}
          title="Background Color"
          className="w-10 h-10 border-2 border-gray-300 rounded-md shadow-sm cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FormattingToolbar;
