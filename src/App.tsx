import React from 'react';
import './App.css';

const items = [
  {id: "100", listId: "2", name: "Soap"},
  {id: "200", listId: "4", name: null},
  {id: "500", listId: "1", name: "Toilet paper"}
];

function App() {

  return (
    <div>
      <h1>Items grouped by listId and alphabetized by name</h1>
      <ol>
        {items.map(item => <li key={item.id}>Group {item.listId}: {item.name}</li>)}
      </ol>
    </div>
  );
}

export default App;
