import './App.css';

import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Context } from './index';

import NavBar from './components/NavBar/NavBar';
import AppRouter from './routes/AppRouter';

import { refreshToken } from './api/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('x-refresh-token')) {
      try {
        refreshToken().then(() => {
          user.setIsAuth(true);
        });
      } catch (error) {
        console.log('errorFromServerRefresh', error);
      }
    }
  }, [user]);

  return (
    <BrowserRouter>
      <NavBar />
      <main className='Main p-5'>
        <div className='container-fluid'>
          <AppRouter />
        </div>
      </main>
    </BrowserRouter>
  );
});

export default App;
