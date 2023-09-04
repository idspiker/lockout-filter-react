import useLockoutFilter from './useLockoutFilter';

export default function LockoutFilter({ entries, setFilteredEntries }) {
  const [categories, selectedCategories, lockedCategories, toggleSelection] =
    useLockoutFilter(entries, setFilteredEntries);

  const normalColor = 'rgb(24, 24, 24)';
  const lockedColor = 'rgb(180, 180, 180)';
  const selectedColor = 'rgb(246, 99, 92)';

  let currentKey = 0;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        rowGap: '0.618rem',
        columnGap: '0.618rem',
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      {categories.map((c) => (
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
            padding: '0.25rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            borderRadius: '7.5px',
            fontWeight: '900',
            fontSize: '0.75rem',
            letterSpacing: '0.05rem',
            color: lockedCategories.includes(c)
              ? lockedColor
              : selectedCategories.includes(c)
              ? selectedColor
              : normalColor,
            border:
              '2px solid ' +
              (lockedCategories.includes(c)
                ? lockedColor
                : selectedCategories.includes(c)
                ? selectedColor
                : normalColor),
            padding: '0.5rem',
            borderRadius: '10px',
            transitionProperty: 'border, color',
            transitionDuration: '0.25s',
            cursor: lockedCategories.includes(c) ? 'not-allowed' : 'pointer',
          }}
          onClick={() => toggleSelection(c)}
          key={currentKey++}
        >
          {c}
        </div>
      ))}
    </div>
  );
}
