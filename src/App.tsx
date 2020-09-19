import React from 'react';
import './App.css';

/*
 * Class that renders the app.
 */
class App extends React.Component {
  state = {items: [], isFetching: true};

  async componentDidMount() {
    
    const getItems = () => {
      // Need proxyurl to avoid CORS blocking response
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    
      return fetch(`${proxyurl}${url}`)
        .then(response => response.json())
        .then (response => {return response})
        .catch(() => console.log('Something went wrong :-('));
    }

    if (this.state.items.length === 0) {
      let responseItems = await getItems() as { id: number, listId: number, name: string }[];

      // Make sure there are items to display.
      if (responseItems && responseItems.length !== 0) {

        // We don't want nulls.
        // Remove 'Item' from name so we cast to number and sort like numbers.
        // Then the item names will then display sorted as a user would expect.
        responseItems = responseItems.filter(x => x['name']);

        for (let i = 0; i < responseItems.length; ++i) {
          responseItems[i].name = responseItems[i].name.substring(5);
        }

        let itemsWithNameAsNumber = responseItems as unknown as { id: number, listId: number, name: number }[];

        for (let i = 0; i < itemsWithNameAsNumber.length; ++i) {
          itemsWithNameAsNumber[i].name = Number(itemsWithNameAsNumber[i].name);
        }

        itemsWithNameAsNumber.sort((x, y) => {
          if (x.listId < y.listId) return -1;
          if (y.listId < x.listId) return 1;

          if (x.name < y.name) return -1;
          if (y.name < x.name) return 1;

          return 0;
        });

        this.setState({items: itemsWithNameAsNumber});
      }
    }

    if (this.state.items.length !== 0) this.setState({isFetching: false});
  }

  public render () {
    const {items, isFetching} = this.state;
  
    return (
      <div>
        <h1>Items grouped by listId and alphabetized by name</h1>
        {isFetching ? 
          <p>Loading the list?</p> : // If the API call hasn't completed yet, or if fetching our items doesn't work.
          <ol>
            {items.map((item: { id: number; listId: number; name: string; }) => 
            <li key={item.id}> List ID {item.listId}: Item {item.name}</li>)}
          </ol>}    
      </div>
    );
  }
}

export default App;