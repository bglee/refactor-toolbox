import React, { useMemo, useCallback } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { Filter, FilterTerms } from "../../model/filter";

interface FilterBoxProps<T extends string> {
  filterKeyOptions: T[];
  filterTermOptions: FilterTerms<T>;
  filter: Filter<T>;
  onChange: (filterTerms: Filter<T>) => void;
}

export const useFilterBoxState = <T extends string>() => {
  const [filter, setFilter] = React.useState<Filter<T>>({ tags: [] });
  const updateFilter = (newFilter: Filter<T>) => {
    setFilter(newFilter);
  };

  return { filter, updateFilter };
};

const useFilterBoxInternalState = <T extends string>({
  filterKeyOptions,
  filterTermOptions,
  filter,
  onChange,
}: {
  filterKeyOptions: T[];
  filterTermOptions: FilterTerms<T>;
  filter: Filter<T>;
  onChange: (filterTerms: Filter<T>) => void;
}) => {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [currentTag, setCurrentTag] = React.useState<T | "">("");
  const [currentTagSearch, setCurrentTagSearch] = React.useState("");
  const [currentTermSearch, setCurrentTermSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const filterKeyOptionsFiltered = useMemo(
    () =>
      currentTagSearch === ""
        ? filterKeyOptions
        : filterKeyOptions.filter((filterKeyOption) =>
            filterKeyOption
              .toLowerCase()
              .includes(currentTagSearch.toLowerCase()),
          ),
    [currentTagSearch, filterKeyOptions],
  );

  const termOptionsFiltered = useMemo(() => {
    const tag = currentTag.replace(":", "") as T;
    const termOptionsForCurrentTag = tag ? filterTermOptions[tag] || [] : [];
    return currentTermSearch === ""
      ? termOptionsForCurrentTag
      : termOptionsForCurrentTag?.filter((term) =>
          term.toLowerCase().includes(currentTermSearch.toLowerCase()),
        );
  }, [filterTermOptions, currentTag, currentTermSearch]);

  // Reset selected index when search changes
  React.useEffect(() => {
    setSelectedIndex(-1);
  }, [currentTagSearch, currentTermSearch]);

  // Modify handleInputKeyDownForTag to handle arrow keys
  const handleInputKeyDownForTag = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const options = filterKeyOptionsFiltered;

      switch (event.key) {
        case "Tab":
          if (options.length > 0) {
            event.preventDefault();
            const selectedOption =
              selectedIndex >= 0 ? options[selectedIndex] : options[0];
            setCurrentTag(selectedOption as T);
            setCurrentTagSearch("");
            setSelectedIndex(-1);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % options.length);
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev <= 0 ? options.length - 1 : prev - 1,
          );
          break;
        case "Enter":
          if (selectedIndex >= 0) {
            setCurrentTag(options[selectedIndex] as T);
            setCurrentTagSearch("");
            setSelectedIndex(-1);
          } else if (options.length === 1) {
            setCurrentTag(options[0] as T);
            setCurrentTagSearch("");
          }
          break;
        case "Backspace":
          if (currentTagSearch === "") {
            onChange({ tags: filter.tags.slice(0, -1) });
          }
          break;
      }
    },
    [
      currentTagSearch,
      filter.tags,
      filterKeyOptionsFiltered,
      onChange,
      selectedIndex,
      setCurrentTag,
      setCurrentTagSearch,
    ],
  );

  const handleOnChangeForTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.endsWith(":")) {
        // Check for exact match first
        const searchValue = event.target.value.slice(0, -1); // Remove the colon
        const exactMatch = filterKeyOptions.find(
          (key) => key.toLowerCase() === searchValue.toLowerCase(),
        );

        if (exactMatch) {
          setCurrentTag(exactMatch as T);
          setCurrentTagSearch("");
        }
        // If no exact match but we have filtered results, take the first one
        else if (filterKeyOptionsFiltered.length === 1) {
          setCurrentTag(filterKeyOptionsFiltered[0] as T);
          setCurrentTagSearch("");
        } else {
          setCurrentTagSearch(event.target.value);
        }
      } else {
        setCurrentTagSearch(event.target.value);
      }
    },
    [
      filterKeyOptions,
      filterKeyOptionsFiltered,
      setCurrentTag,
      setCurrentTagSearch,
    ],
  );

  const handleClickForTag = useCallback(
    (filterKey: string) =>
      (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault();
        setCurrentTag(filterKey as T);
        setCurrentTagSearch("");
      },
    [setCurrentTag, setCurrentTagSearch],
  );

  // Modify handleInputKeyDownForTerm similarly
  const handleInputKeyDownForTerm = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const options = termOptionsFiltered;

      switch (event.key) {
        case "Tab":
          if (options.length > 0) {
            event.preventDefault();
            const selectedTerm =
              selectedIndex >= 0 ? options[selectedIndex] : options[0];
            setCurrentTag("");
            setCurrentTermSearch("");
            onChange({
              tags: [
                ...filter.tags,
                { tag: currentTag as T, term: selectedTerm },
              ],
            });
            setSelectedIndex(-1);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % options.length);
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev <= 0 ? options.length - 1 : prev - 1,
          );
          break;
        case "Enter":
          if (selectedIndex >= 0) {
            setCurrentTag("");
            setCurrentTermSearch("");
            onChange({
              tags: [
                ...filter.tags,
                { tag: currentTag as T, term: options[selectedIndex] },
              ],
            });
            setSelectedIndex(-1);
          } else if (options.length === 1) {
            setCurrentTag("");
            setCurrentTermSearch("");
            onChange({
              tags: [
                ...filter.tags,
                { tag: currentTag as T, term: options[0] },
              ],
            });
          }
          break;
        case "Backspace":
          if (currentTermSearch === "") {
            setCurrentTag("");
          }
          break;
      }
    },
    [
      currentTag,
      currentTermSearch,
      filter,
      onChange,
      selectedIndex,
      termOptionsFiltered,
    ],
  );

  const handleOnChangeForTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTermSearch(event.target.value);
    },
    [setCurrentTermSearch],
  );

  const handleClickForTerm = useCallback(
    (term: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      setCurrentTag("");
      onChange({
        tags: [...filter.tags, { tag: currentTag as T, term }],
      });
    },
    [currentTag, filter.tags, onChange, setCurrentTag],
  );

  const dropdownActive = searchFocused && filterKeyOptionsFiltered.length > 0;

  return {
    selectedIndex,
    isTagSearch: currentTag === "",
    dropdownActive,
    setSearchFocused,
    currentTag,
    currentTagSearch,
    currentTermSearch,
    filterKeyOptionsFiltered,
    termOptionsFiltered,
    handleInputKeyDownForTag,
    handleOnChangeForTag,
    handleClickForTag,
    handleInputKeyDownForTerm,
    handleOnChangeForTerm,
    handleClickForTerm,
  };
};

//TODO: Handle search without tags case ie: search all terms by input
interface FilterBoxDropdownItemProps {
  label: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  selected?: boolean;
}

const DropdownItem = ({
  label,
  value,
  onClick,
  selected,
}: FilterBoxDropdownItemProps) => (
  <li
    className={`py-1 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900 z-10 ${
      selected ? "bg-yellow-50 text-gray-900" : ""
    }`}
    onMouseDown={onClick}
  >
    <b>{label}</b>: {value}
  </li>
);

export const FilterBox = <T extends string>({
  filter,
  filterKeyOptions,
  filterTermOptions,
  onChange,
}: FilterBoxProps<T>) => {
  const {
    selectedIndex,
    isTagSearch,
    dropdownActive,
    setSearchFocused,
    currentTag,
    currentTagSearch,
    currentTermSearch,
    filterKeyOptionsFiltered,
    termOptionsFiltered,
    handleInputKeyDownForTag,
    handleOnChangeForTag,
    handleClickForTag,
    handleInputKeyDownForTerm,
    handleOnChangeForTerm,
    handleClickForTerm,
  } = useFilterBoxInternalState({
    filterKeyOptions,
    filterTermOptions,
    filter,
    onChange,
  });

  return (
    <div className="w-full relative m-2">
      <div
        id="input"
        className={`bg-base-200 border border-neutral flex items-center p-1 rounded-t-md ${!dropdownActive && "rounded-b-md"}`}
      >
        <MaterialIcon name="search" className="px-2" />

        {filter.tags.map(({ tag, term }, i) => (
          <div
            className="badge whitespace-nowrap rounded-md p-2 shadow-sm shadow-primary/40 h-6 mr-3 flex items-center justify-center"
            key={i}
          >
            <div className="cursor-pointer text-[14px] flex items-center justify-center mr-2 font-bold font-mono text-primary/50">
              x
            </div>

            <span className="">{`${tag} : `}</span>
            <span className="text-primary/80 pl-1">{term}</span>
          </div>
        ))}

        {currentTag !== "" && (
          <div className="badge whitespace-nowrap rounded-md shadow-sm shadow-primary/20 h-6">
            {currentTag}:
          </div>
        )}

        <input
          value={isTagSearch ? currentTagSearch : currentTermSearch}
          className="w-full bg-base-200/0 focus:outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          onKeyDown={
            isTagSearch ? handleInputKeyDownForTag : handleInputKeyDownForTerm
          }
          onChange={isTagSearch ? handleOnChangeForTag : handleOnChangeForTerm}
        />
      </div>
      {dropdownActive && (
        <ul className="bg-neutral w-full z-10 p-1 absolute top-8 max-h-[30vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-b-md">
          {isTagSearch
            ? filterKeyOptionsFiltered.map((filterKey, index) => (
                <DropdownItem
                  key={filterKey}
                  label={filterKey}
                  value="[value]"
                  onClick={handleClickForTag(filterKey)}
                  selected={index === selectedIndex}
                />
              ))
            : termOptionsFiltered.map((term, index) => (
                <DropdownItem
                  key={term}
                  label={currentTag}
                  value={term}
                  onClick={handleClickForTerm(term)}
                  selected={index === selectedIndex}
                />
              ))}
        </ul>
      )}
    </div>
  );
};
