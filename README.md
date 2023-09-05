# react-lockout-filter
A custom hook and component to provide lockout filter functionality in React.js.

## Component Use
Begin by pulling the LockoutFilter.jsx and useLockoutFilter.jsx into your project and importing them into your file.

Next, create the array of data that you would like to filter. It must be an array of nested objects, each with a "categories" attribute that stores an array of strings. These categories are what your array will be filtered by.

```
const toFilter = [
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
const [filtered, setFiltered] = useState(toFilter);
```

Now you can use the LockoutFilter component, passing the toFilter array into the entries prop and the setFiltered into the setFilteredEntries prop.

```
<LockoutFilter entries={toFilter} setFilteredEntries={setFiltered} />
```

The LockoutFilter component will automatically detect categories to sort by, and will update your filtered array based on the filter selections using the setFiltered function that you passed it.

### Component use example
```
import LockoutFilter from 'insert path here';

export default function Example() {
  const toFilter = [
    {
      name: 'Chess Engine',
      categories: ['Python', 'Pygame']
    },
    {
      name: 'Webscraper',
      categories: ['Python', 'Beautiful Soup', 'SQL']
    }
  ];

  const [filtered, setFiltered] = useState(toFilter);

  return (
    <>
      <LockoutFilter entries={toFilter} setFilteredEntries={setFiltered} />
      <div>filtered.map((e, i) => <div key={i}>{e.name}</div>)</div>
    </>
  );
}
```
