import React from 'react';
import Tree from './Tree';
import { data } from './data';
import SortableComponent from './Demo';

function App() {
  return (
    <div className="App">
     <Tree arrData={data}  />
      <SortableComponent />
    </div>
  );
}

export default App;
