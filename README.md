# react super components

## API

### SuperImage

```
import {SuperImage} from 'react-super-components';

<SuperImage
  src="http://brentcarnduff.com/wp-content/uploads/2014/08/url-small.jpg"
  style={{}} />
```

### SuperList

```
import {SuperList} from 'react-super-components';

const list = ['item1', 'item2', 'item3', ...];

<SuperList
  rowHeight={50} // specify pixel height or pass a height determining function
  list={ list } // pass your array/list
  listItem={ <ListItem /> } // pass a component that expects index and list
/>

```
#### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| className | String |  | CSS class name |
| list | Array | ✓ | The list you want to use. |
| listItem | Object |  | Component to use for each row/listItem. Will receive index and the list itself as props. |
| noRowsRenderer |  | Function | Callback used to render placeholder content when your list is empty |
| rowHeight | Number or Function | ✓ | Either a fixed row height (number) or a function that returns the height of a row given its index: `(index: number): number` |
| rowRenderer | Function |  | Responsbile for rendering a row given an index. Signature should look like `(index: number): React.PropTypes.node` |
| scrollToIndex | Number |  | Row index to ensure visible (by forcefully scrolling if necessary) |
| thresholdRows |  | Number | Number of rows to render above/below the visible bounds of the list. This can help reduce flickering during scrolling on certain browers/devices. |


## Testing
1. run npm test-watch
2. there is a meteor app under kitchen-sink, cd into it and run meteor
