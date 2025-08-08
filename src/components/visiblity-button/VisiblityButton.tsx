import React, { useEffect, useMemo, useRef } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { IconButton } from "../common/IconButton";
import { isCommonKey, isDefaultVisible } from "../../config/common_keys";
import { ListUtils } from "../../utils/ListUtils";
import { useKeyVisibilityStore } from "../../store/store-hooks/useKeyVisibilityStore";
import { useSearchTerms } from "../../store/derived-store-hooks/useSearchTerms";

interface VisibilityKeySectionProps {
  title: string;
  children: React.ReactNode;
}

interface KeyListItemProps {
  keyName: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const VisiblityKeySection: React.FC<VisibilityKeySectionProps> = ({ title, children }) => (
  <>
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <ul className="grid grid-flow-row grid-cols-5 gap-2 p-2">{children}</ul>
  </>
);

const KeyListItem: React.FC<KeyListItemProps> = ({ keyName, checked, onChange }) => (
  <li className="whitespace-nowrap">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`inline-flex items-center justify-start gap-2 rounded-lg border px-3 py-2 w-full text-left transition-colors ${
        checked
          ? "border-primary/50 bg-primary/10 text-base-content"
          : "border-base-300 bg-base-100 hover:border-base-content/30"
      }`}
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
          checked ? "bg-primary text-primary-content border-primary" : "border-base-300"
        }`}
        aria-hidden="true"
      >
        {checked ? <MaterialIcon name="check" className="text-[14px] leading-none" /> : null}
      </span>
      <span title={keyName} className="truncate block">
        {keyName}
      </span>
    </button>
  </li>
);

export const VisiblityButton: React.FC = () => {
  const { keyVisibility, setKeyVisibility } = useKeyVisibilityStore();

  const searchTerms = useSearchTerms();

  const allKeys = useMemo(
    //Filter out keys with no search terms
    () => Object.entries(searchTerms).map(([key]) => key),
    [searchTerms]
  );

  useEffect(() => {
    setKeyVisibility(allKeys.filter(isDefaultVisible));
  }, [allKeys]);
  const [open, setOpen] = React.useState(false);

  const popoverRef = useRef<HTMLDivElement>(null); // Reference to the popover element
  const triggerRef = useRef<HTMLButtonElement>(null); // Reference to the trigger element

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Close the popover if clicked outside
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const commonKeys = ListUtils.alphabetize(allKeys.filter(isCommonKey));
  const otherKeys = ListUtils.alphabetize(allKeys.filter((key) => !isCommonKey(key)));

  return (
    <div className="flex items-center relative">
      <IconButton name="visibility" title="Visibility" onClick={() => setOpen(!open)} />
      {open && (
        <div
          className="bg-base-100 border border-base-300 p-3 rounded-xl shadow-md z-20 absolute top-full left-3 mt-2 w-[48vw] max-h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200"
          ref={popoverRef}
        >
          {allKeys.length === 0 && (
            <VisiblityKeySection title="">
              <p className="text-sm text-gray-500">No keys found</p>
            </VisiblityKeySection>
          )}
          {commonKeys.length > 0 && (
            <VisiblityKeySection title="Common">
              {commonKeys.map((key) => (
                <KeyListItem
                  key={key}
                  keyName={key}
                  checked={keyVisibility.includes(key)}
                  onChange={(checked) => {
                    if (checked) {
                      setKeyVisibility([...keyVisibility, key]);
                    } else {
                      setKeyVisibility(keyVisibility.filter((k) => k !== key));
                    }
                  }}
                />
              ))}
            </VisiblityKeySection>
          )}
          {otherKeys.length > 0 && (
            <VisiblityKeySection title="Other">
              {otherKeys.map((key) => (
                <KeyListItem
                  key={key}
                  keyName={key}
                  checked={keyVisibility.includes(key)}
                  onChange={(checked) => {
                    if (checked) {
                      setKeyVisibility([...keyVisibility, key]);
                    } else {
                      setKeyVisibility(keyVisibility.filter((k) => k !== key));
                    }
                  }}
                />
              ))}
            </VisiblityKeySection>
          )}
        </div>
      )}
    </div>
  );
};
