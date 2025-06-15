import React from 'react';
import { FaRegPaste } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';

const CopyPasteControls = ({ onCopy, onPaste, isPasteDisabled }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onCopy}
        className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition flex items-center gap-2"
      >
        <IoCopy />
         Copy 
      </button>
      <button
        onClick={onPaste}
        disabled={isPasteDisabled}
        className={`px-4 py-1 rounded transition flex items-center gap-2 ${
          isPasteDisabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-teal-600 text-white hover:bg-teal-700'
        }`}
      >
        <FaRegPaste />
         Paste 
      </button>
    </div>
  );
};

export default CopyPasteControls;
