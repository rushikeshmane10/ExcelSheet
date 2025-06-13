import React from "react";

const FormattingToolbar = ({ onFormat, selectedCell }) => {
  const isBold = selectedCell?.formatting?.bold || false;

  return (
    <div className="mb-2 flex gap-2">
      <button
        onClick={() => onFormat("bold", !isBold)} // Toggle bold
        className={`px-3 py-1 rounded ${
          isBold ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        } hover:bg-gray-400`}
      >
        {isBold ? "Normal" : "Bold"}
      </button>

      <input
        type="color"
        onChange={(e) => onFormat("backgroundColor", e.target.value)}
        title="Background Color"
        className="w-10 h-10 p-0 border rounded"
      />
    </div>
  );
};

export default FormattingToolbar;
