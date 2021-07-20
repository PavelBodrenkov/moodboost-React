
import './App.css';
import React from 'react';
import { BrowserRouter, useLocation} from 'react-router-dom';

import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';

const App = () => {

  return (
   <BrowserRouter>
     
      <AppRouter />
   </BrowserRouter>
   
  );
}

export default App;
