const alphabetize = <T>(
  list: T[] | string[],
  key?: keyof T,
): T[] | string[] => {
  if (list.length === 0) {
    return [];
  }

  if (typeof list[0] === "string") {
    return (list as string[]).sort((a, b) => a.localeCompare(b));
  }

  if (!key) {
    throw new Error("Key must be provided for object arrays");
  }

  return (list as T[]).sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
};

export const ListUtils = {
  alphabetize,
};
