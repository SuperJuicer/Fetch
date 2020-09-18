import React from 'react';
import './App.css';

interface IItem {
  id: string,
  listId: string,
  name: string
}

function getItems(): Promise<void | IItem[]> {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';

  return fetch(proxyurl + url)
    .then(response => response.json())
    .then(response => {return response as IItem[]})
    .catch(() => console.log(`Can't access ${url} response. Blocked by CORS?`));
}

// async function getItems(this: any) {
//   const response = await fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json');
//   console.log(response); // nothing logs
//   const data = response.json();
//   this.setState({items: data});
// }

class App extends React.Component {
  state = {
    items: [],
    isFetching: true
  };

  public componentDidMount() {
    if (this.state.items.length === 0) getItems();
  }

  public render () {
    const {items, isFetching} = this.state;
  
    return (
      <div>
        <h1>Items grouped by listId and alphabetized by name</h1>
        {isFetching ? 
          <p>Loading the list?</p> : // If the API call hasn't completed yet
          <ol>
            {items.map((item: { id: string; listId: string; name: string; }) => 
            <li key={item.id}> Group {item.listId}: {item.name}</li>)}
          </ol>}    
      </div>
    );
  }
}

export default App;