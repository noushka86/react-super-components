import React from 'react';
import Options from './superlist/Options';
import { List } from '../lib/index.js';
import { Header, ShortListItem, TallListItem } from './superlist/ListItems.jsx';

class ListDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      groupData: false,
      list: [],
      listLength: 1000,
      listToDisplay: 'single',
      sortData: false,
      thresholdRows: 10,
    };
    this.changeDisplayedList = this.changeDisplayedList.bind(this);
    this.setGroupData = this.setGroupData.bind(this);
    this.setSortData = this.setSortData.bind(this);
    this.setListLength = this.setListLength.bind(this);
    this.setListThreshold = this.setListThreshold.bind(this);
  }

  setGroupData() {
    this.setState({ groupData: !this.state.groupData });
  }

  setListLength(listLength) {
    this.setState({ listLength });
  }

  setListThreshold(value) {
    const numberValue = Number(value);
    const thresholdRows = Math.ceil(numberValue / 18);

    this.setState({ thresholdRows });
  }

  setSortData() {
    this.setState({ sortData: !this.state.sortData });
  }

  changeDisplayedList(listToDisplay) {
    this.setState({ listToDisplay });
  }

  createList(listLength, varying) {
    const list = [];

    for (let i = 0; i < listLength; i++) {
      if (varying) {
        if (i % 3 === 0) {
          list.push({
            type: 'tall',
            category: 'Taller List Items',
            randomNumber: Math.round(Math.random() * 100),
          });
        } else {
          list.push({
            type: 'short',
            category: 'Shorter List Items',
            randomNumber: Math.round(Math.random() * 100),
          });
        }
      } else {
        list.push(i);
      }
    }

    return list;
  }

  returnDisplayedList(listToDisplay) {
    const { listLength, thresholdRows } = this.state;
    const list = this.createList(listLength);
    const varyingList = this.createList(listLength, true);
    const itemTypes = [
      { type: 'header', height: 50, component: Header },
      { type: 'tall', height: 100, component: TallListItem },
      { type: 'short', height: 50, component: ShortListItem },
    ];
    const groupBy = 'category';
    const sortBy = 'randomNumber';

    if (listToDisplay === 'multiple') {
      return (
        <div>
          <h3>Multiple Components List</h3>
          <div style={{ border: '1px solid #ddd', height: '40vh' }}>
            <List
              data={ varyingList }
              itemTypes={ itemTypes }
              thresholdRows={ thresholdRows }
              groupBy={ this.state.groupData ? groupBy : null }
              sortBy={ this.state.sortData ? sortBy : null }
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>One Component List</h3>
        <div style={{ border: '1px solid #ddd', height: '40vh' }}>
          <List
            data={ list }
            itemTypes={ { height: 50, component: ShortListItem } }
            thresholdRows={ thresholdRows }
          />
        </div>
      </div>
    );
  }

  render() {
    const listToDisplay = this.state.listToDisplay;

    return (
      <div>
        <h1>SuperList</h1>
        <Options
          changeDisplayedList={this.changeDisplayedList}
          setGroupData={this.setGroupData}
          setListLength={this.setListLength}
          setListThreshold={this.setListThreshold}
          setSortData={this.setSortData}
        />
        { this.returnDisplayedList(listToDisplay) }
      </div>
    );
  }
}

export default ListDemo;

