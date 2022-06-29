import React, { useContext } from 'react';

import { Context } from '../../index';

import { HTMLSelect } from '@blueprintjs/core';

const Limit = () => {
  const { content } = useContext(Context);

  const handleChange = (e) => {
    content.setLimit(e.currentTarget.value);
  };

  return (
    <HTMLSelect
      className='content__info-limit--select'
      value={content.limit}
      onChange={handleChange}
    >
      <option value={10}>10 записей</option>
      <option selected value={12}>
        12 записей
      </option>
      <option value='18'>18 записей</option>
      <option value='24'>24 записи</option>
      <option value='48'>48 записей</option>
    </HTMLSelect>
  );
};

export default Limit;
