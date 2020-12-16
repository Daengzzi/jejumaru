import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import './Etc/ScrollToTop';
import Userpage from "./userpage";

import reportWebVitals from './Etc/reportWebVitals';
import ScrollToTop from "./Etc/ScrollToTop";
import IdFind from "./Login/idFind";
import PwFind from "./Login/pwFind";
import Login from "./Login/login";
import Join from "./Login/join";
import Update from "./Login/update";
import AdminIndex from "./adminIndex";

//--------------  여기가 찐

class Index extends Component {


    render() {

        return (
            <>
                <Route path="/jejumaru" component={withRouter(Userpage)}/>
                <Route path="/idFind" component={withRouter(IdFind)}/>
                <Route path="/pwFind" component={withRouter(PwFind)}/>
                <Route path="/login" component={withRouter(Login)}/>
                <Route path="/join" component={withRouter(Join)}/>
                <Route path="/update" component={withRouter(Update)}/>
                <Route path="/admin" component={withRouter(AdminIndex)}/>
            </>
        );
    }
}

//-----------------  여기가 찐




export default Index;

ReactDOM.render( <BrowserRouter><ScrollToTop><Index /></ScrollToTop></BrowserRouter>,document.getElementById('root')
);


reportWebVitals();