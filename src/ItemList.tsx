import * as React from 'react';
import IItem from './Item';

interface IProps {
    items: IItem[];
}

const ItemList: React.FunctionComponent<IProps> = props => {
    const {items} = props;

    return (
        <ol>
            {items.map(item => <li key={item.id}> Group {item.listId}: {item.name}</li>)}
        </ol>
    );
};

export default ItemList;