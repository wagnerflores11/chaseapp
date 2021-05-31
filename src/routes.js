import React from 'react';
import {  BrowserRouter, Switch, Route } from 'react-router-dom';

          
import SignInSide from './pages/login';


export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                             
                <Route path="/" exact component={SignInSide} />

            </Switch>
        </BrowserRouter>
    )
}