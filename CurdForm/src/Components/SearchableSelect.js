import React, { useState, useEffect, useRef } from "react";

const SearchableSelect = ({ options, onChange, value }) => {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const optionsRef = useRef([]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
    setHighlightedIndex(-1);
  }, [search, options]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (option) => {
    setSearch(option.label);
    setFilteredOptions(options);
    setIsOpen(false);
    onChange(option);
    inputRef.current.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setIsOpen(true);
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setIsOpen(true);
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex]);
      } else {
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex, filteredOptions]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        ref={inputRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        placeholder="Select state"
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                ref={(el) => (optionsRef.current[index] = el)}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-100" : ""
                }`}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
