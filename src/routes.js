import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Login from './pages/SigIn/login';
import Crud from './pages/Integration/actions';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      
      <PrivateRoute path="/admin/integracao" component={Crud} />
      
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;






/*import React from 'react';
import {  BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/userinput';

//import Usuarios from './pages/admin/usuarios';
//import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
//import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar'
//import Gridfiscal from './pages/client/workfiscal/grid'              
import Login from './pages/SigIn/login';
import PrivateRoute from './services/wAuth';







export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                             
                <Route path="/" exact component={Login} />
                             
                <PrivateRoute path="/dashboard" exact component={Dashboard} />              

            </Switch>
        </BrowserRouter>
    )
}
*/