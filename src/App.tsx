import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import giphy_trending, { giphy_api_key } from 'Giphy'
import InfiniteGrid from 'InfiniteGrid'

function App() {
  const [openedItem, setOpenedItem] = useState<giphy_trending>(null as unknown as giphy_trending);
  const [items, setItems] = useState<giphy_trending[]>([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const result = await axios(
      `http://api.giphy.com/v1/gifs/trending?api_key=${giphy_api_key}&offset=${items.length}`,
    );

    setItems(items.concat(result.data.data));
  }

  // Passing empty array of dependencies creates warnings because fetchData depends on items
  useEffect(() => {
    if (items.length === 0) fetchData();
  });

  const nextPage = () => { fetchData() };

  const openItemHandler = (id: string) => {
    let item = items.filter((item) => item.id === id)[0];
    setOpenedItem(item)
  }

  const closeOpenedItem = (event: any) => {
    setOpenedItem(null as unknown as giphy_trending);
  }

  const renderItem = (item: any) => {
    let i = item as giphy_trending;
    return (
        <div>
            <img src={i.images.fixed_height.url} width="200" alt={i.title} />
            <br />
            {i.title}
        </div>
    )
  }

  if (openedItem === null) {
    return (
      <div>
        <input type="text" value={filter} onChange={event => setFilter(event.target.value)} />
        <InfiniteGrid
          items={items.filter((item) => item.title.includes(filter))}
          itemsPerRow="3" 
          nextPage={nextPage}
          openItem={openItemHandler}
          renderItem={renderItem}
        />
      </div>
    );
  } else {
    let item = openedItem as unknown as giphy_trending;
    return (
      <div><img src={item.images.original.url} alt={item.title} />
        <br />
        {item.title}
        <br />
        <button type="button" onClick={closeOpenedItem}>Close</button>
      </div>
    );
  }

}

export default App;