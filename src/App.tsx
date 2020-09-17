import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    items: [
      {id: '200', listId: '2', name: 'Second item'},
      {id: '100', listId: '4', name: null},
      {id: '300', listId: '1', name: 'First item'}
    ],
    isFetching: false
  };

  public componentDidMount() {
    if (this.state.items.length === 0) return;
  }

  public render () {
  
    return (
      <div>
        <h1>Items grouped by listId and alphabetized by name</h1>
        {this.state.isFetching ? 
          <p>Loading the list :-)</p> : // If the API call hasn't completed yet
          <ol>
            {this.state.items.map(item => <li key={item.id}> Group {item.listId}: {item.name}</li>)}
          </ol>}    
      </div>
    );
  }
}

export default App;