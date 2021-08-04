import React, { useEffect, useState } from 'react';
import {Switch, Route, Redirect, useLocation, matchPath } from 'react-router-dom';
import { publicRoutes, AdminRout } from '../routes';
import { MAINPOSTS_ROUTE } from '../utils/consts';
import ProtectedRoute from './ProtectedRoute/ProtecredRiute';
import Header from './Header/Header';
import PopupAuth from '../components/PopupAuth/PopupAuth';
import ScrollUp from './scrollUp/ScroppUp';

const AppRouter = () => {
const[log, setLog] = useState(false)

    const location = useLocation()
    useEffect(() => {
        if (matchPath(location.pathname, { path: '/admin' })) {
            setLog(false)
        } else if (matchPath(location.pathname, { path: '/signinadmin' })) {
            setLog(false)
        } else {
            setLog(true)
        }
    }, [location.pathname])

    const[loginIn, setLoginIn] = useState(false)
    const[signIn, setSignIn] = useState(false)
    

    return(
        <>
       { log && <Header />}
       
    
        <Switch>
            {publicRoutes.map(({path, Component}) => {
                return(
                    <Route key={path} path={path} component={Component}/>
                )
            })}

            <ProtectedRoute path={AdminRout[0].path} component={AdminRout[0].Component}/>     
            <Route path={AdminRout[1].path} component={AdminRout[1].Component}/>
            <ProtectedRoute path={AdminRout[2].path} component={AdminRout[2].Component}/>
            <ProtectedRoute path={AdminRout[3].path} component={AdminRout[3].Component}/>  
            <Redirect to={MAINPOSTS_ROUTE} />
        </Switch>
        <PopupAuth />
          <ScrollUp />
        </>
    )
}

export default AppRouter