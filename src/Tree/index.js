import React from 'react';
import PropTypes from 'prop-types';

import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import { WrapperCategoryTree, WrapperEntry, WrapperBox } from './styles';

// const SortableItem = SortableElement((props) => <WrapperEntry {...props} />);
// const SortableList = SortableContainer((props) => <ul {...props} />);

const SortableItem = SortableElement(({ item, index, items }) => {
  const { children, id, total, isFirstLevel, category_level } = item;
  let classname = '';
  let height = 0;
  if (total !== 0) height = total * 60;
  else height = 60;
  if (!children || children.length === 0) {
    classname = 'last-entry';
  }
  return <WrapperEntry
    id={id}
    onlyChilren={index + 1 === items.length}
    isFirstLevel={!!isFirstLevel}
    height={`${height}px`}
    key={id}
    className={`entry ${classname}`}
  >
    <WrapperBox isFirstLevel={!!isFirstLevel}>
        <p>{item.name_ja}</p>
      </WrapperBox>
      <SortableList items={children} />
  </WrapperEntry>
});

const SortableList = SortableContainer(({ items, disabled }) => (
 <ul>
    {
      items.map((item, index) => {
        return <SortableItem
          collection="item"
          key={index}
          item={item}
          items={items}
          index={index}
          disabled={disabled}
        />
    }
    )}
  </ul>
))

class CategoryTree extends React.Component {
  getFirstLevel = arr =>
    arr.map(it => ({
      ...it,
      isFirstLevel: true,
    }));

  countSingleArray = arr => {
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (!arr[i].children || !arr[i].children.length) {
        count += 1;
      } else {
        count += this.countSingleArray(arr[i].children);
      }
    }
    return count;
  };

  formatData = arr =>
    arr.map(item => {
      if (!item.children || !item.children.length) {
        return { ...item, total: 0 };
      }
      return {
        ...item,
        total: this.countSingleArray(item.children),
        children: this.formatData(item.children),
      };
    });

  render() {
    const { arrData } = this.props;
    const data = this.formatData(arrData);
    const dataFormat = this.getFirstLevel(data);
    return (
      <WrapperCategoryTree>
        <SortableList items={dataFormat} />
      </WrapperCategoryTree>
    );
  }
}

export default CategoryTree;

CategoryTree.propTypes = {
  arrData: PropTypes.array.isRequired,
  redirectEditCategory: PropTypes.func.isRequired,
};
