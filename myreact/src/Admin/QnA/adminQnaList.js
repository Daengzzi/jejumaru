import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../adminNoticeList.css';
import AuthService from "../../services/authService";
import $ from "jquery";
import AdminQnaPagination from "../../Pagination/adminQnaPagination";

class AdminQnaList extends Component{

    componentDidMount() {

    }

    render() {
        return (
            <>
                 <div id="admin-section">
                     <div className="qandaWrap">
                     <div className="titleh2">
                         <h2>Q & A</h2>
                         <hr className="hr3color"/>
                     </div>

                     <div className="qandatabWrap">
                         <Route path="/admin/qna/page/:page" component={withRouter(AdminQnaPagination)}/>
                         <br/>

                     </div>
                     </div>
                </div>
            </>
        );
    }
}


export default withRouter(AdminQnaList);

