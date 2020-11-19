import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import giphy_trending from 'Giphy'
import InfiniteGrid from 'InfiniteGrid'
import { addItemsAsync, selectItems } from 'features/items/itemsSlice';

function App() {
  const items = useSelector(selectItems)
  const dispatch = useDispatch()

  const [openedItem, setOpenedItem] = useState<giphy_trending>(null as unknown as giphy_trending);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (items.length === 0) dispatch(addItemsAsync(0))
  })

  const nextPage = () => { dispatch(addItemsAsync(items.length))}

  const openItemHandler = (id: string) => {
    let item = items.filter((item: giphy_trending) => item.id === id)[0];
    setOpenedItem(item)
  }

  const closeOpenedItem = (event: any) => {
    setOpenedItem(null as unknown as giphy_trending);
  }

  const renderItem = (item: any) => {
    let i = item as giphy_trending;
    return (
        <div>
            <img src={i.images.fixed_height.url} height="200" alt={i.title} />
            <br />
            {i.title}
        </div>
    )
  }

  if (openedItem === null) {
    return (
      <div>
        <h1>Giphy Trending Demo Project</h1>
        <input type="text" value={filter} onChange={event => setFilter(event.target.value)} />
        <InfiniteGrid
          items={items.filter((item: giphy_trending) => item.title.includes(filter))}
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
