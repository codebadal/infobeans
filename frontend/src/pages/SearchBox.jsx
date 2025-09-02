import { useState, useEffect } from "react";

export default function SearchBox({ onSearch, placeholder, delay = 600 }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    // cleanup timeout on new keystroke
    return () => clearTimeout(handler);
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full md:w-1/3 px-3 py-2 mb-4 border border-gray-300 rounded shadow-sm focus:ring focus:ring-gray-200"
    />
  );
}
