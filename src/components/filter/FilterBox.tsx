import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { Filter, FilterTerms } from "../../model/filter";
import { useFilterStore } from "../../store/store-hooks/useFilterStore";
import { useSearchTerms } from "../../store/derived-store-hooks/useSearchTerms";
import FilterTag from "./FilterTag";

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
            filterKeyOption.toLowerCase().includes(currentTagSearch.toLowerCase())
          ),
    [currentTagSearch, filterKeyOptions]
  );

  const termOptionsFiltered = useMemo(() => {
    const tag = currentTag.replace(":", "") as T;
    const termOptionsForCurrentTag = tag ? filterTermOptions[tag] || [] : [];
    return currentTermSearch === ""
      ? termOptionsForCurrentTag
      : termOptionsForCurrentTag?.filter((term) =>
          term.toLowerCase().includes(currentTermSearch.toLowerCase())
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
            const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : options[0];
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
          setSelectedIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
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
    ]
  );

  const handleOnChangeForTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // If user types ':' and there is exactly one option, accept it
      if (value.endsWith(":")) {
        const searchValue = value.slice(0, -1);
        const exactMatch = filterKeyOptions.find(
          (key) => key.toLowerCase() === searchValue.toLowerCase()
        );
        if (exactMatch) {
          setCurrentTag(exactMatch as T);
          setCurrentTagSearch("");
          return;
        }
        // If we have a single filtered option, accept it
        const filtered = filterKeyOptions.filter((k) =>
          k.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filtered.length === 1) {
          setCurrentTag(filtered[0] as T);
          setCurrentTagSearch("");
          return;
        }
        // Otherwise, keep the ':' search text to continue filtering
        setCurrentTagSearch(value);
        return;
      }

      // Live filter the list while typing (search mode)
      setCurrentTagSearch(value);
    },
    [filterKeyOptions, setCurrentTag, setCurrentTagSearch]
  );

  const handleClickForTag = useCallback(
    (filterKey: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      setCurrentTag(filterKey as T);
      setCurrentTagSearch("");
    },
    [setCurrentTag, setCurrentTagSearch]
  );

  // Modify handleInputKeyDownForTerm similarly
  const handleInputKeyDownForTerm = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const options = termOptionsFiltered;

      switch (event.key) {
        case "Tab":
          if (options.length > 0) {
            event.preventDefault();
            const selectedTerm = selectedIndex >= 0 ? options[selectedIndex] : options[0];
            setCurrentTag("");
            setCurrentTermSearch("");
            onChange({
              tags: [...filter.tags, { tag: currentTag as T, term: selectedTerm }],
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
          setSelectedIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
          break;
        case "Enter":
          {
            const chosen = selectedIndex >= 0 ? options[selectedIndex] : options[0];
            if (chosen !== undefined) {
              setCurrentTag("");
              setCurrentTermSearch("");
              onChange({
                tags: [...filter.tags, { tag: currentTag as T, term: chosen }],
              });
              setSelectedIndex(-1);
            }
          }
          break;
        case "Backspace":
          if (currentTermSearch === "") {
            // If no value text, exit value mode and remove the pending tag selection only
            setCurrentTag("");
          }
          break;
      }
    },
    [currentTag, currentTermSearch, filter, onChange, selectedIndex, termOptionsFiltered]
  );

  const handleOnChangeForTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTermSearch(event.target.value);
    },
    [setCurrentTermSearch]
  );

  const handleClickForTerm = useCallback(
    (term: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      setCurrentTag("");
      onChange({
        tags: [...filter.tags, { tag: currentTag as T, term }],
      });
    },
    [currentTag, filter.tags, onChange, setCurrentTag]
  );

  const dropdownActive =
    searchFocused &&
    (currentTag === "" ? filterKeyOptionsFiltered.length > 0 : termOptionsFiltered.length > 0);

  // Refs to control focus
  const tagInputRef = useRef<HTMLInputElement>(null); // key search input
  const valueInputRef = useRef<HTMLInputElement>(null); // value input inside chip

  // In search mode, Backspace with empty search deletes the last tag
  // In value mode (inside a tag), Backspace with empty value exits tag selection
  const handleContainerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        setSearchFocused(false);
        return;
      }
      if (event.key !== "Backspace") return;

      if (currentTag === "") {
        // Search mode
        if (currentTagSearch === "" && currentTermSearch === "" && filter.tags.length > 0) {
          onChange({ tags: filter.tags.slice(0, -1) });
        }
      } else {
        // Value mode
        if (currentTermSearch === "") {
          // If there is no value typed yet, exit tag selection entirely
          setCurrentTag("");
          // Focus back to key search input on next tick
          setTimeout(() => tagInputRef.current?.focus(), 0);
        }
      }
    },
    [currentTag, currentTagSearch, currentTermSearch, filter.tags, onChange, setCurrentTag]
  );

  // Click outside to close dropdown only (do not clear inputs)
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    if (searchFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchFocused]);

  // Clicking the container re-opens and focuses the proper input
  const handleContainerMouseDown = useCallback(() => {
    setSearchFocused(true);
    if (currentTag === "") {
      setTimeout(() => tagInputRef.current?.focus(), 0);
    } else {
      setTimeout(() => valueInputRef.current?.focus(), 0);
    }
  }, [currentTag]);

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
    handleContainerKeyDown,
    handleContainerMouseDown,
    containerRef,
    tagInputRef,
    valueInputRef,
  };
};

//TODO: Handle search without tags case ie: search all terms by input
interface FilterBoxDropdownItemProps {
  label: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  selected?: boolean;
}

const DropdownItem = ({ label, value, onClick, selected }: FilterBoxDropdownItemProps) => (
  <li
    className={`py-1 relative cursor-pointer hover:bg-primary/10 hover:text-base-content z-10 ${
      selected ? "bg-primary/10 text-base-content" : ""
    }`}
    onMouseDown={onClick}
  >
    <b>{label}</b>: {value}
  </li>
);

export const FilterBox = () => {
  const filterTermOptions = useSearchTerms();

  const filterKeyOptions = useMemo(
    //Filter out keys with no search terms
    () =>
      Object.entries(filterTermOptions)
        .filter(([, value]) => value.length > 0)
        .map(([key]) => key),
    [filterTermOptions]
  );

  const { filter, setFilter } = useFilterStore();

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
    handleContainerKeyDown,
    handleContainerMouseDown,
    containerRef,
    tagInputRef,
    valueInputRef,
  } = useFilterBoxInternalState({
    filterKeyOptions,
    filterTermOptions,
    filter,
    onChange: setFilter,
  });

  return (
    <div
      className="w-full relative m-2"
      onKeyDown={handleContainerKeyDown}
      onMouseDown={handleContainerMouseDown}
      ref={containerRef}
    >
      <div
        id="input"
        className={`bg-base-100 border border-base-300 flex flex-wrap items-center content-start gap-2 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 rounded-t-xl ${!dropdownActive ? "rounded-b-xl" : ""}`}
      >
        <MaterialIcon name="search" className="text-base-content/60" />

        {filter.tags.map(({ tag, term }, i) => (
          <FilterTag
            key={i.toString()}
            tag={tag}
            term={term}
            onRemove={() => setFilter({ tags: filter.tags.filter((_, index) => index !== i) })}
          />
        ))}

        {currentTag !== "" && (
          <FilterTag size="md" tag={currentTag} term="">
            <input
              ref={valueInputRef}
              value={currentTermSearch}
              onChange={handleOnChangeForTerm}
              onKeyDown={handleInputKeyDownForTerm}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none placeholder:text-base-content/50 w-24"
              placeholder="value"
              autoFocus
            />
          </FilterTag>
        )}

        {currentTag === "" && (
          <input
            ref={tagInputRef}
            value={currentTagSearch}
            className="flex-1 bg-transparent focus:outline-none placeholder:text-base-content/50 min-w-[8ch]"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={handleInputKeyDownForTag}
            onChange={handleOnChangeForTag}
            placeholder="type key… then :"
          />
        )}
      </div>
      {dropdownActive && (
        <ul className="bg-base-100 border border-base-300 w-full z-20 p-2 absolute top-full left-0 max-h-[40vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200 rounded-b-xl shadow-md">
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
