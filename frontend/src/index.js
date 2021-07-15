import React, { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import UserStore from './store/UserStore';
import PostStore from './store/PostStore';
import CategoryStore from './store/CategoryStore';
import AdminStore from './store/AdminStore';
import PopupStore from './store/PopupStore';
require('dotenv').config({path:'./index'});
export const Context = createContext(null)



ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    post: new PostStore(),
    category: new CategoryStore(),
    admin: new AdminStore(),
    popup: new PopupStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

