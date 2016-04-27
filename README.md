# react super components

## Demo
https://react-super-components.herokuapp.com/

## API

### Image
```
/**
 * Image component is a wrapper for <img/> with lazy loading and error
 * handling support.
 *
 * Props:
 * - src (required)
 * - loadingSrc
 * - loadingComponent (loadingComponent takes precedence over loadingSrc)
 * - errorSrc
 * - errorComponent (errorComponent takes precedence over errorSrc)
 *
 * Other props will be pass to the html native img commponent,
 * loadingComponent and errorComponent.
 *
 * When error happens, an error prop will be passed to errorComponent.
 *
 * NOTE: Using 'width' and 'height' in style is highly recommanded.
 */

import { Image } from 'react-super-components';

<Image
  src="http://brentcarnduff.com/wp-content/uploads/2014/08/url-small.jpg" />

<Image
  loadingSrc="/local-image.jpg"
  src="http://brentcarnduff.com/wp-content/uploads/2014/08/url-small.jpg" />

<Image
  loadingComponent={MyLoadingComponent}
  errorComponent={MyErrorComponent}
  src="http://brentcarnduff.com/wp-content/uploads/2014/08/url-small.jpg" />
```

### Subscriptions
```
import { Subscriptions, permanentlySubscribe } from 'react-super-components';

<Subscriptions
  getSubscriptions={() => { return [Meteor.subscribe('cars')] }}
  displayComponent={<CarsContainer/>} />

<Subscriptions
  getSubscriptions={() => { return [permanentlySubscribe('cars')] }}
  displayComponent={<CarsContainer/>} />
```

### Stack
```
import { Stack, Layer, Layout } from 'react-super-components';

const animations = [
  {
    to: 'users',
    use: 'toLeft',
    reverse: 'toRight'
  },
  {
    to: 'cars',
    use: () => {
      return {
        currentLayer: {
          transition: '1s all',
          startStyle: {marginLeft: '0px'},
          endStyle: {marginLeft: '100%'}
        },
        nextLayer: {
          transition: '1s all',
          startStyle: {marginLeft: '100%'},
          endStyle: {marginLeft: '0px'}
        }
      }
    }
    // by default, 'reverse' is the reverse of 'use'
  }
];

const MainLayout = (props) => {
  return (
    <div style={{display: 'flex'}}>
      {this.props.top}
      {this.props.bottom}
    </div>
  )
}

<Layout component={MainLayout} id='main-layout'>
  <Stack layoutRegion='top' animations={animations} id='main' defaultActiveLayerId='users'>
    <Layer id='users' component={Users}/>
    <Layer id='cars' component={Cars}/>
  </Stack>
  <Layer layoutRegion='bottom'/>
</Layout>
```

### List

```
import { List } from 'react-super-components';
import ShortListItem from 'exampleImportedListItemComponent';

// Example ListItem component. Should expect to receive data and index as props.

const ListItem = (props) => {
  const { data, index } = props;
  const dataItem = data[index];
  // when used with multiple list item components examples:
  // const dataItem = data[index].data;

  return (
    <div>{dataItem} is at row {index}</div>
  );
};
```
#### List with single list item component

```
const listToBeRendered = [
  'Ray Mysterio',
  'Ric Flair',
];
const itemType = { height: 60, component: ListItem };

<List
  data={ listToBeRendered }
  itemTypes={ itemType }
/>

```

#### List with multiple list item components

```
const listToBeRenderedWithMultipleTypes = [
  { type: 'listItem', data: 'Macho Man Randy Savage'},
  { type: 'listItem', data: 'Sting'},
  { type: 'shortListItem', data: 'The Giant'},
];
const itemTypes = [
  { type: 'listItem', height: 60, component: ListItem },
  { type: 'shortListItem', height: 20, component: ShortListItem },
];

<List
  data={ listToBeRenderedWithMultipleTypes }
  itemTypes={ itemTypes }
/>
```

#### List with multiple list item components and groupBy

```
const listToBeRenderedWithMultipleTypes = [
  { type: 'listItem', data: 'Macho Man Randy Savage'},
  { type: 'listItem', data: 'Sting'},
  { type: 'shortListItem', data: 'The Giant'},
  { type: 'shortListItem', data: 'The Big Show'},
];
const itemTypes = [
  { type: 'listItem', height: 60, component: ListItem },
  { type: 'shortListItem', height: 40, component: ShortListItem },
  { type: 'header', height: 30, component: Header },
];

// GroupBy can either be the property to group the data by or a function that expects
// dataItem and returns the grouping
const groupByWithFunction = (dataItem) => {
  if (dataItem.type === 'listItem') {
    return 'Regular Sized Wrestlers';
  }

  return 'Giant Sized Wrestlers';
}

const groupByWithString = 'type';

<List
  data={ listToBeRenderedWithMultipleTypes }
  groupBy={ groubByWithString }
  itemTypes={ itemTypes }
/>
```

#### List Prop Types

| Property            | Type               | Required?                   | Description                                                                                                                                                      |
| :---:               | :---:              | :---:                       | :---:                                                                                                                                                            |
| className           | String             |                             | CSS class name                                                                                                                                                   |
| data                | Array              | ✓                           | The data you want to use. If multiple `itemTypes` are given, data must be an array of objects with a property `type` that matches a passed `type` in `itemTypes` |
| itemTypes           | Object or Array    | ✓                           | Either an object or an array of objects with the specified properties listed below                                                                               |
| itemTypes.type      | String             | ✓ (when multiple itemTypes) | Used to match data with its corresponding component when multiple `itemTypes` are given                                                                          |
| itemTypes.height    | Number             | ✓                           | Specifies the height of the rendered React component                                                                                                             |
| itemTypes.component | Function           | ✓                           | Specifies the React component that will be rendered                                                                                                              |
| groupBy             | Function or String |                             | Either a string that specifies which property to group the given `data` by or a function that expects dataItem and returns how the `data` should be grouped      |
| thresholdRows       | Number             |                             | Number of rows to render above/below the visible bounds of the list. This can help reduce flickering during scrolling on certain browers/devices                 |


## Testing
```
cd kitchen-sink
meteor npm install
meteor run
```
