
import './App.css';
import React from 'react';
import { BrowserRouter, useLocation} from 'react-router-dom';

import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';

const App = () => {
//  const location = useLocation();
// useEffect(() => {
//       tokenCheck()
//   }, [history])

//   function tokenCheck()  {
//       if(localStorage.getItem("adminToken")) {
//           const token = localStorage.getItem("adminToken")
//           if(token) {
//               fetchAdminMe(token).then(res => {
//                   if(res) {
//                       console.log(res)
//                       history.push(ADMIN_ROLE_ROURE)
//                       admin.setIsAuth(true)
//                       console.log('прошло')
//                   } else {
//                       console.log('не прошло')
//                   }
//               })
//               .catch((err) => console.log(err));
//           }
//        }
//   }

  return (
   <BrowserRouter>
     
      <AppRouter />
   </BrowserRouter>
   
  );
}

export default App;
