import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { MAIN_ROUTE, CONTENT_ROUTE } from '../../utils/consts';
import Login from '../Modals/Login';

const NavBar = observer(() => {
  const [loginVisible, setLoginVisible] = useState(false);
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('username');
    setLoginVisible(true);
  };

  return (
    <>
      <nav className='bp4-navbar bp4-dark'>
        <div className='container-fluid' style={{ margin: '0 auto' }}>
          <div className='bp4-navbar-group bp4-align-left'>
            <button className='bp4-button bp4-minimal bp4-icon-home'>
              <Link
                to={MAIN_ROUTE}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Домой
              </Link>
            </button>
          </div>
          <div className='bp4-navbar-group bp4-align-right'>
            {user.isAuth && (
              <button className='bp4-button bp4-minimal bp4-icon-document'>
                <Link
                  to={CONTENT_ROUTE}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Контент
                </Link>
              </button>
            )}
            <span className='bp4-navbar-divider'></span>
            {user.isAuth ? (
              <button
                className='bp4-button bp4-minimal bp4-icon-log-out'
                onClick={() => logOut()}
              >
                Выйти
              </button>
            ) : (
              <button
                className='bp4-button bp4-minimal bp4-icon-log-in'
                onClick={() => setLoginVisible(true)}
              >
                Войти
              </button>
            )}
          </div>
        </div>
        <Login isOpen={loginVisible} onClose={() => setLoginVisible(false)} />
      </nav>
    </>
  );
});

export default NavBar;
