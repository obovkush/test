import React, { useContext, useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import Item from './Item';

import { fetchItems } from '../../api/contentAPI';

const ItemList = observer(() => {
  const { content } = useContext(Context);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const data = await fetchItems(content.page, content.limit);
      content.setItems(data.result);
    };

    getItems();
  }, [content.page, content.limit, content]);

  return (
    <>
      <div className='content__items'>
        {content.items.map((item) => (
          <Item key={item._id} item={item} loading={loading} />
        ))}
      </div>
    </>
  );
});

export default ItemList;
