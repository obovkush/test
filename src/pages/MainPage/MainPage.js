import React, { useContext } from 'react';

import { Context } from '../../index';

const MainPage = () => {
  const { user } = useContext(Context);

  const username = localStorage.getItem('username');

  return (
    <div className='col content__box'>
      {user.isAuth ? (
        <h3 className='bp4-heading page-title'>
          Вы вошли в систему как {username}.
        </h3>
      ) : (
        <h3 className='bp4-heading page-title'>
          Это тестовое задание, для продолжения войдите.
        </h3>
      )}
    </div>
  );
};

export default MainPage;
