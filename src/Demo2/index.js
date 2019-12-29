import React from 'react';
import arrayMove from 'array-move';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';

class SortableComponent extends React.Component {

  constructor() {
		super();
		this.state = {
      sections: [
        {section: 'A', level1: 1, items: [
          {section: 'A1', level: 2, items: [
            { section: 'A11', level: 3, items: [
              { section: 'A111', level: 4, items: []},
              { section: 'A112', level: 4, items: []}
            ] },
            { section: 'A12', level: 3, items: [] },
          ]},
          {section: 'A2', level: 2, items: [
            { section: 'A21',level: 3, items: [
              { section: 'A211', level: 4, items: []},
              { section: 'A212', level: 4, items: []}
            ] },
            { section: 'A22',level: 3, items: [] },
          ]}, 
          {section: 'A3', level: 2, items: []}
        ]},
        {section: 'B', level: 1, items: [
          {section: 'B1', level: 2, items: []},
          {section: 'B2', level: 2, items: []}
        ]}, 
        { section: 'C', level: 1, items: []}]
		}
	}

  SortableItem = SortableElement(({ name, index, k, onSortEnd }) => {
      return 	<li className='SortableItem'>
        <this.SectionContainer
          // sections={name.items}
          index={index}
          section={name.section}
          items={name.items}
          sectionIndex={k}
          onSortEnd={this.onSectionSortEnd.bind(this, k, name.level)}
        />
      </li>
}

);

   SortableItemList = SortableContainer(({ items, disabled, onSortEnd }) => (
	<ul>
		{items.map((name, index) => {
      return 	<this.SortableItem
				collection="item"
				key={`item-${index}`}
				name={name}
        index={index}
        k={index}
        disabled={disabled}
        onSortEnd={onSortEnd}
			/>
    }
		)}
	</ul>
))

 SectionContainer = (props) => {
    const { section, index, sectionIndex, level, items, onSortEnd } = props;
    return (
      <div className="SortableSection">
        <h5>Section: {section} </h5>

        <this.SortableItemList
          items={items}
          sectionIndex={sectionIndex}
          onSortEnd={onSortEnd.bind(this,sectionIndex, level)}
        />
      </div>
    );
}

 SortableSection = SortableElement(
  ({ section, index, sectionIndex, level, items, onSortEnd }) => (
    <this.SectionContainer
      section={section}
      index={index}
      sectionIndex={sectionIndex}
      items={items}
      level={level}
      onSortEnd={onSortEnd}
    />
  )
);

 SortableSectionList = SortableContainer(
  ({ sections, onSectionSortEnd }) => (
    <div>
      {sections.map(({ section, items, level }, index) => (
        <this.SortableSection
          collection="section"
          key={`item-${section}`}
          section={section}
          index={index}
          sectionIndex={index}
          level={level}
          items={items}
          onSortEnd={onSectionSortEnd}
        />
      ))}
    </div>
  )
);

	onSortEnd({oldIndex, newIndex}) {
		this.setState({
            sections: arrayMove(this.state.sections, oldIndex, newIndex)
        });
	}
	onSectionSortEnd(sectionIndex, level, {oldIndex, newIndex}) {
    console.log('indexParent', sectionIndex);
    console.log('levelParent', level);
    console.log('ollIndex', oldIndex);
    console.log('newIndex', newIndex);
		const section = this.state.sections[sectionIndex];

		section.items = arrayMove(section.items, oldIndex, newIndex);
		
		this.setState({
			sections: this.state.sections
		});
	}
	render() {
		return (
			<this.SortableSectionList
				sections={this.state.sections}
				lockAxis="y"
				lockToContainerEdges
        distance={10}
				onSortEnd={this.onSortEnd.bind(this)}
				onSectionSortEnd={this.onSectionSortEnd.bind(this)}
			/>
		)
	}
}

export default SortableComponent;