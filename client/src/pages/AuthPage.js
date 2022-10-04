import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError()
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async() => {
    try {
      const data = await request(
        'api/auth/register',
        'POST',
        // @ts-ignore
        { ...form }
      )
      console.log('Data', data);
    } catch(e) {
    }
  };

  const loginHandler = async() => {
    try {
      const data = await request(
        'api/auth/login',
        'POST',
        { ...form }
      )
      auth.login(data.token, data.userId);
    } catch(e) {
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2>AuthPage</h2>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>

            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  name="email"
                  type="text"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 12 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
