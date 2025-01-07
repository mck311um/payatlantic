interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (event: any) => void;
}

function SearchBar({ searchQuery, handleSearchChange }: SearchBarProps) {
  return (
    <label className="input input-bordered bg-white flex text-neutral-900 items-center gap-2 w-1/3 placeholder:text-neutral-700">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-6 w-6 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

export default SearchBar;
