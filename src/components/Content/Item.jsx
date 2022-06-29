import React from 'react';

import { observer } from 'mobx-react-lite';

import { Card } from '@blueprintjs/core';

const Item = observer(({ item, loading }) => {
  return (
    <Card
      style={{
        width: 250,
        height: 100,
      }}
      border={'gray'}
      className={'d-flex flex-column justify-content-between mt-2 mx-1 p-2'}
    >
      {loading ? (
        <>
          <div className='content__item-name'>{item.name}</div>
          <div>{item.category}</div>
        </>
      ) : (
        <div>Загрузка</div>
      )}
    </Card>
  );
});

export default Item;
