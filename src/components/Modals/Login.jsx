import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../index';

import { MAIN_ROUTE } from '../../utils/consts';
import { login } from '../../api/userAPI';

import {
  Button,
  Classes,
  FormGroup,
  Dialog,
  InputGroup,
} from '@blueprintjs/core';

const Login = ({ isOpen, onClose }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  const handleBtnClick = async () => {
    setBtnLoading(true);
    try {
      await login(username, password);
      user.setIsAuth(true);
      localStorage.setItem('username', username);

      navigate(MAIN_ROUTE);
      setBtnLoading(false);
      onClose();
    } catch (err) {
      setError(err);
      setBtnLoading(false);
      console.log('error', { error });
    }
  };

  return (
    <div
      style={{
        display: 'block',
        width: 400,
        padding: 30,
      }}
    >
      <Dialog
        title='Вход в аккаунт'
        icon='log-in'
        isOpen={isOpen}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label='Имя'
            labelFor='username'
            labelInfo='*'
            helperText={username.length ? '' : 'Поле не должно быть пустым'}
          >
            <InputGroup
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='Введите имя'
            />
          </FormGroup>
          <FormGroup
            label='Пароль'
            labelFor='password'
            labelInfo='*'
            helperText={
              !password.length
                ? 'Поле не должно быть пустым'
                : error.message
                ? `Ошибка. Проверьте правильность ввода учетных данных.`
                : ''
            }
          >
            <InputGroup
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Введите пароль'
            />
          </FormGroup>
          <Button
            disabled={username === '' || password === ''}
            loading={btnLoading}
            onClick={handleBtnClick}
          >
            Войти
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;
