# react-lockout-filter
A custom hook and component to provide lockout filter functionality in React.js.

## Functionality
This component (and hook) allows you to filter object entries in arrays through the use of a "categories" array on each object. Applied filters will affect what further filters can be applied. For example, say you are listing programming projects and the "categories" field on your objects contained the technologies and languages that you used. If you have a project with the categories array ['Python', 'AWS Lambda'] one with the array ['JavaScript', 'React'], and one with the array ['JavaScript', 'express'] and filtered by JavaScript, you would no longer be able to filter by Python or AWS Lambda. However, you could still filter by React or express. Essentially, the filters that no longer apply to the current selection are locked out. To filter by Python, you would first need to de-select the JavaScript filter. 

## Component Use
Begin by pulling the LockoutFilter.jsx and useLockoutFilter.jsx into your project and importing them into your file.

Next, create the array of the data that you would like to filter. It must be an array of nested objects, each with a "categories" attribute that stores an array of strings. These categories are what your array will be filtered by.

```
const items = [
  {
    categories: [...],
    ...otherAttributes
  },
  ...otherObjects
];
```
##### Snippet: example of array structure.

Create a copy of this array to filter, storing it as state using useState.

```
const [filtered, setFiltered] = useState(items);
```

Now you can use the LockoutFilter component, passing the items array into the entries prop and the setFiltered into the setFilteredEntries prop.

```
<LockoutFilter entries={items} setFilteredEntries={setFiltered} />
```

The LockoutFilter component will automatically detect categories to sort by, and will update your filtered array based on the filter selections using the setFiltered function that you passed it.

### Component use example
```
import LockoutFilter from './LockoutFilter';

export default function Example() {
  const items = [
    {
      name: 'Chess Engine',
      categories: ['Python', 'Pygame']
    },
    {
      name: 'Webscraper',
      categories: ['Python', 'Beautiful Soup', 'SQL']
    }
  ];

  const [filtered, setFiltered] = useState(items);

  return (
    <>
      <LockoutFilter entries={items} setFilteredEntries={setFiltered} />
      <div>{filtered.map((e, i) => <div key={i}>{e.name}</div>)}</div>
    </>
  );
}
```

## Custom Hook Use
Begin by pulling the useLockoutFilter file into your project and importing the useLockoutFilter hook into your file.

The hook takes as arguments two pieces of data: the complete array of entries and the setState function for a copy of the entries array. The array must hold objects that have a "categories" attribute.

For example, set up your data this way:

```
const items = [
  {
    categories: [...],
    ...otherAttributes
  },
  ...otherObjects
];

const [filtered, setFiltered] = useState(items);
```

Pass the items array and the setFiltered function to the useLockoutFilter hook.

The hook returns four values in an array, which can be destructured. These values are categories, selectedCategories, lockedCategories, and toggleSelection.

> categories: An array containing all of the categories found in the "categories" attributes of the objects in the items array passed to it. This array does not contain duplicates.

> selectedCategories: An array containing all of the categories that are actively being filtered by.

> lockedCategories: An array containing all of the categories that are locked; they cannot be filtered by. A category becomes locked when the other selected categories do not exist in a project with said category.

> toggleSelection: A function that toggles the selection status of the categoty (string) passed to it. This function will change the values of the selectedCategories and lockedCategories when run.

```
const [categories, selectedCategories, lockedCategories, toggleSelection] =
    useLockoutFilter(items, setFiltered);
```

Use the toggleSelection function to toggle the filtering of categories by passing the category string to it.

```
toggleSelection('JavaScript');
```

The other return values can be used in your components to indicate what categories are available for filtering, locked, and already selected.
