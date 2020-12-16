import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../adminNoticeList.css';
import AuthService from "../../services/authService";
import Pagination from "../../Pagination/memberListPagination";
import $ from "jquery";
import NoticePagination from "../../Pagination/adminNoticePagination";

class AdminNoticeList extends Component{

    render() {
        return (
            <>
                 <div id="admin-section">
                    <div className="noticeWrap">
                        <div className="titleh2">
                            <h2>공지사항</h2>
                            <hr className="hr3color"/>
                        </div>

                        <div className="noticetabWrap">
                            <Route path="/admin/notice/page/:page" component={withRouter(NoticePagination)}/>
                            <br/>

                                <Link to="/admin/notice/write">
                                    <button className="writeBtn">신규등록</button>
                                </Link>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default withRouter(AdminNoticeList);

