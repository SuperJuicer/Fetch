import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    items: [],
    isFetching: true
  };

  async componentDidMount() {
    const getItems = () => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    
      return fetch(proxyurl + url)
        .then(response => response.json())
        .then(response => this.setState({items: response}))   
        .catch(() => console.log(`Can't access ${url} response. Blocked by CORS?`));
    }

    if (this.state.items.length === 0) await getItems();

    if (this.state.items.length !== 0) this.setState({isFetching: false});
  }

  public render () {
    const {items, isFetching} = this.state;
  
    return (
      <div>
        <h1>Items grouped by listId and alphabetized by name</h1>
        {isFetching ? 
          <p>Loading the list?</p> : // If the API call hasn't completed yet
          <ol>
            {items.map((item: { id: number; listId: number; name: string; }) => 
            <li key={item.id}> Group {item.listId}: {item.name}</li>)}
          </ol>}    
      </div>
    );
  }
}

export default App;