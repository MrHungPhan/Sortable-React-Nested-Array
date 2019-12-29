import React from 'react';
import arrayMove from 'array-move';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';

import './style.css';

class SortableComponent extends React.Component {

 SortableItem = SortableElement(({ name, index, onSortEndItem, sortIndex }) => {
  return 	<li className='SortableItem'>
    <h5>Item : {name.section}</h5>
    <this.SortableList lockAxis="y" onSortEnd={(a) => this.onSort(name, sortIndex, a)} items={name.items} />
  </li>
}

);

 SortableList = SortableContainer(({ items, disabled }) => (
	<ul>
		{items.map((name, index) => {
      return 	<this.SortableItem
				collection="item"
				key={`item-${index}`}
				name={name}
        index={index}
        sortIndex={index}
        disabled={disabled}
			/>
    }
		
		)}
	</ul>
))

	constructor() {
		super();
    this.state = {
      sections: [
        {section: 'A', level: 1, parent: '', items: [
          {section: 'A1', parent: 'A', level: 2, items: [
            { section: 'A11', parent: 'A1', level: 3, items: [
              { section: 'A111', parent: 'A11', level: 4, items: []},
              { section: 'A112', parent: 'A1', level: 4, items: []}
            ] },
            { section: 'A12', parent: 'A1', level: 3, items: [] },
          ]},
          {section: 'A2',parent: 'A', level: 2, items: [
            { section: 'A21',parent: 'A2',level: 3, items: [
              { section: 'A211',parent: 'A21', level: 4, items: []},
              { section: 'A212',parent: 'A21', level: 4, items: []}
            ] },
            { section: 'A22',parent: 'A2',level: 3, items: [] },
          ]}, 
          {section: 'A3',parent: 'A', level: 2, items: []}
        ]},
        {section: 'B',parent: '', level: 1, items: [
          {section: 'B1', parent: 'B', level: 2, items: [
            { section: 'B11',parent: 'B1', level: 3, items: []},
            { section: 'B12',parent: 'B1', level: 3, items: [
              { section: 'B121',parent: 'B12', level: 4, items: []},
              { section: 'B122',parent: 'B12', level: 4, items: []}
            ]}
          ]},
          {section: 'B2', parent: 'B', level: 2, items: []}
        ]}, 
        { section: 'C', parent: '', level: 1, items: []}]
		}
	}
	onSortEnd({oldIndex, newIndex}) {
		this.setState({
            sections: arrayMove(this.state.sections, oldIndex, newIndex)
        });
	}
	onSectionSortEnd(sectionIndex, {oldIndex, newIndex}) {
		const section = this.state.sections[sectionIndex];

		section.items = arrayMove(section.items, oldIndex, newIndex);
		
		this.setState({
			sections: this.state.sections
		});
  }

  getLevel = (data) => {
    return data.reduce((arr, item) => {
      if (item.items && item.items.length) 
      return [...arr, ...item.items];
      return arr;
    }, [])
  }

  
  onSort = (name, sortIndex, { oldIndex, newIndex }) => {
    console.log('name', name);
    const lv1 = [...this.state.sections];
    const lv2 = this.getLevel(lv1);
    const lv3 = this.getLevel(lv2);
    const lv4 = this.getLevel(lv3);
    console.log('lv2', lv2 );
    console.log('lv3', lv3);
    console.log('lv4', lv4);
    if (name) {
      const { level, parent } = name;
      switch (level) {
        case 1:
          const section = this.state.sections[sortIndex];
          section.items = arrayMove(section.items, oldIndex, newIndex);
          this.setState({
            sections: this.state.sections,
          });
          return;
        case 2: 
          const indexLv1 = lv1.findIndex(it => (it.section === parent));
          console.log(indexLv1);
          const sectionLv2 = this.state.sections[indexLv1].items[sortIndex];
          sectionLv2.items = arrayMove(sectionLv2.items, oldIndex, newIndex);
          this.setState({
            sections: this.state.sections,
          })
          return;
        case 3:
          const lv2Finder = lv2.find(it => it.items[sortIndex] && it.items[sortIndex].section === name.section);
          const lv2Filter = lv2.filter(it => it.parent === lv2Finder.parent);
          console.log(lv2Filter);
          const indexLv2 = lv2Filter.findIndex(it => (it.section === parent));
          const indexLvel1 = lv1.findIndex(it => it.section === lv2Filter[indexLv2].parent);
          console.log(indexLv2);
          console.log(indexLvel1);
          const sectionLv3 = this.state.sections[indexLvel1].items[indexLv2].items[sortIndex];
          sectionLv3.items = arrayMove(sectionLv3.items, oldIndex, newIndex);
          this.setState({
            sections: this.state.sections,
          })
          return;
        default: return;
      }
    } else {
      this.setState({
        sections: arrayMove(this.state.sections, oldIndex, newIndex),
      })
    }
  }

	render() {
		return (
      <this.SortableList lockAxis="y" items={this.state.sections} onSortEnd={(a) => this.onSort('', '',a)}/>
		)
	}
}

export default SortableComponent;