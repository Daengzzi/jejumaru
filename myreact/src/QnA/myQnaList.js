import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import "../My/myQnaList.css";
import AuthService from "../services/authService";
import MyQnaPagination from "../Pagination/myQnaPagination";

class MyQnaList extends Component{


    a
    render() {
        return (
            <section>
          <div className="qandaWrap">
        <div className="titleh2">
            <h2>Q & A</h2>
            <hr className="hr3color"/>
        </div>

        <div className="qandatabWrap">
            <Route path="/jejumaru/myqna/page/:page" component={withRouter(MyQnaPagination)}/>

        </div>
    </div>

</section>


        );
    }
}

export default withRouter(MyQnaList);
