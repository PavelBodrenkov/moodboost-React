import { observer } from "mobx-react-lite";
import React, { Component, useContext } from "react";
import {Route, Redirect} from "react-router-dom";
import { Context } from "../../index";
import {LOGIN_ADMIN_ROUTE} from '../../utils/consts'

const ProtectedRoute = observer(({component: Component, ...props}) => {
    const {admin} = useContext(Context)
    return (
        <Route>
            {() =>
               admin.isAuth ? <Component {...props} /> : <Redirect to={LOGIN_ADMIN_ROUTE} />
            }
        </Route>
    )
})

export default ProtectedRoute