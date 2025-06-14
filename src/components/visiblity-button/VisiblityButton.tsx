import React, { useEffect, useMemo, useRef } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { isCommonKey, isDefaultVisible } from "../../config/common_keys";
import { ListUtils } from "../../utils/ListUtils";
import { useKeyVisibilityStore } from "../../store/store-hooks/useKeyVisibilityStore";
import { useSearchTerms } from "../../store/second-order-data-hooks/useSearchTerms";

interface VisibilityButtonProps {
  allKeys: string[];
}

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
    <h4 className="text-lg font-bold">{title}</h4>
    <ul className="grid grid-flow-row grid-cols-5 gap-2 p-2">{children}</ul>
  </>
);

const KeyListItem: React.FC<KeyListItemProps> = ({ keyName, checked, onChange }) => (
  <li className="whitespace-nowrap">
    <label className="flex items-center gap-1">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {keyName}
    </label>
  </li>
);

export const VisiblityButton: React.FC= (
 
) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const commonKeys = ListUtils.alphabetize(allKeys.filter(isCommonKey));
  const otherKeys = ListUtils.alphabetize(allKeys.filter((key) => !isCommonKey(key)));


  return (
    <div className="flex items-center relative">
      <button onClick={() => setOpen(!open)} ref={triggerRef} className="flex items-center">
        <MaterialIcon name="visibility" />
      </button>
      {open && (
        <div
          className="bg-neutral border border-primary p-2 rounded z-10 absolute top-full left-3 mt-1 w-[48vw] max-h-[27vw] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
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
