import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface ISearchBarProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="my-6  flex items-center rounded-lg bg-slate-800 px-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-slate-800 px-2 py-1 text-lg text-slate-400/90 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} className="text-xl text-slate-400" />
    </div>
  );
};

export default SearchBar;
