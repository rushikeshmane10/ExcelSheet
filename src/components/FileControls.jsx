const FileControls = ({ rows, cols, data, setRows, setCols, setData }) => {
  const handleSave = () => {
    const json = { rows, cols, data };

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);

        if (
          typeof json.rows !== "number" ||
          typeof json.cols !== "number" ||
          !Array.isArray(json.data)
        ) {
          alert("Invalid file structure.");
          return;
        }

        setRows(json.rows);
        setCols(json.cols);
        setData(json.data);
      } catch (error) {
        alert("Failed to load spreadsheet: Invalid JSON file.");
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  return (
<div className="flex flex-wrap gap-2 items-center">
  <label className="relative cursor-pointer group">
    <span className="flex items-center gap-2 px-4 py-1 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700 transition">
      Import Sheet
    </span>
    <input
      type="file"
      accept=".json"
      onChange={(e) => handleLoad(e.target.files[0])}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </label>

  <button
    onClick={handleSave}
    className="flex items-center gap-2 px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
  >
    Save Sheet
  </button>
</div>

  );
};

export default FileControls;
