import { useState, useMemo, useCallback } from 'react';

export default function useLockoutFilter(entries, setFilteredEntries) {
  const categories = useMemo(() => getCategoryData(entries), [entries]);

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [lockedCategories, setLockedCategories] = useState([]);

  const toggleSelection = useCallback(
    (category) => {
      if (lockedCategories.includes(category)) return;

      let currentIsfilterActive = isFilterActive;
      let newCategories = [];

      if (selectedCategories.includes(category)) {
        newCategories = selectedCategories.filter((c) => c !== category);
      } else {
        newCategories = [...selectedCategories, category];
      }

      setSelectedCategories(newCategories);

      if (newCategories.length === 0) {
        setIsFilterActive(false);
        currentIsfilterActive = false;
        setLockedCategories([]);
      } else {
        setIsFilterActive(true);
        currentIsfilterActive = true;

        const unlockedCategories = new Set();
        for (let i = 0; i < entries.length; i++) {
          if (includesAll(entries[i].categories, newCategories)) {
            entries[i].categories.forEach((c) => unlockedCategories.add(c));
          }
        }

        setLockedCategories(
          categories.filter((c) => !unlockedCategories.has(c))
        );
      }

      setFilteredEntries(
        entries.filter((e) =>
          currentIsfilterActive
            ? includesAll(e.categories, newCategories)
            : true
        )
      );
    },
    [categories, isFilterActive, selectedCategories, lockedCategories]
  );

  return [categories, selectedCategories, lockedCategories, toggleSelection];
}

function getCategoryData(entries) {
  const categoryOccuranceCounts = {};
  const categoriesSet = new Set();
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries[i].categories.length; j++) {
      const category = entries[i].categories[j];
      categoriesSet.add(category);

      if (categoryOccuranceCounts[category] === undefined) {
        categoryOccuranceCounts[category] = 1;
      } else {
        categoryOccuranceCounts[category]++;
      }
    }
  }

  const categoriesSorted = sortCategories(
    categoriesSet,
    categoryOccuranceCounts
  );

  return categoriesSorted;
}

function sortCategories(categories, occurances) {
  // Sorts categories based on name occurances and then name
  return [...categories]
    .toSorted((a, b) => {
      return a === b ? 0 : a > b ? -1 : 1;
    })
    .toSorted((a, b) => {
      return occurances[a] === occurances[b]
        ? 0
        : occurances[a] > occurances[b]
        ? -1
        : 1;
    });
}

function includesAll(iter1, iter2) {
  for (let i = 0; i < iter2.length; i++) {
    if (!iter1.includes(iter2[i])) return false;
  }

  return true;
}
