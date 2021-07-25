import React, { useEffect, useState } from 'react';
import {Switch, Route, Redirect, useLocation, matchPath } from 'react-router-dom';
import { publicRoutes, AdminRout } from '../routes';
import { MAINPOSTS_ROUTE } from '../utils/consts';
import ProtectedRoute from './ProtectedRoute/ProtecredRiute';
import Header from './Header/Header'

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
    

    return(
        <>
       { log && <Header />}
       
    
        <Switch>
            {/* <Route path="/" render={(props) => (props.location.pathname !== "/signinadmin") && 
                <Header />}>
            </Route> */}
            {/* {user.isAuth === true && authRoutes.map(({path, Component}) => {
                return(
                    <Route key={path} path={path} component={Component} exact/>
                )
            })} */}
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
      
        </>
    )
}

export default AppRouter