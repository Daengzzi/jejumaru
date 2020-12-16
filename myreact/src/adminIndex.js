import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import './Admin/admin.css';
import logo from './Logo/logo2.png';
import jQuery from "jquery";
import AdminMemberList from "./Admin/Member/adminMemberList";
import AdminNoticeList from "./Admin/Notice/adminNoticeList";
import AdminNoticeView from "./Admin/Notice/adminNoticeView";
import AdminNoticeWrite from "./Admin/Notice/adminNoticeWrite";
import AdminNoticeUpdate from "./Admin/Notice/adminNoticeUpdate";
import AdminQnaList from "./Admin/QnA/adminQnaList";
import AdminQnaView from "./Admin/QnA/adminQnaView";
import AuthService from "./services/authService";
window.$ = window.jQuery = jQuery;



class Admin extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
        window.location.href = "/jejumaru";
    }

    render() {
        return (
            <>
                <div id="admin-wrap">
                    <div id="admin-nav">
                        <ul>
                            <li><Link className="dropdown-item" to="/jejumaru"><img src={logo}/></Link></li>
                            <li><Link className="dropdown-item" to="/jejumaru"
                                      style={{color: "yellow", marginLeft: "10px"}} onClick={this.logOut}>로그아웃</Link></li>
                            <li><Link className="dropdown-item" to="/admin/member/page/1"
                                      style={{color: "white"}}><i className="fa fa-sitemap"></i>회원</Link></li>
                            {/*<li><Link className="dropdown-item" to="#"*/}
                            {/*          style={{color: "white"}}><i className="fa fa-line-chart"></i> 리뷰</Link></li>*/}
                            <li><Link className="dropdown-item" to="/admin/notice/page/1"
                                      style={{color: "white"}}><i className="fa fa-comments-dollar"></i>공지사항</Link></li>
                            <li><Link className="dropdown-item" to="/admin/qna/page/1"
                                      style={{color: "white"}}><i className="fa fa-map-marker"></i>Q&A</Link></li>
                        </ul>
                    </div>
                    <Route path="/admin/member/page/:page" component={withRouter(AdminMemberList)}/>
                    <Route path="/admin/notice/page/:page" component={withRouter(AdminNoticeList)}/>
                    <Route path="/admin/notice/detail/:nno" component={withRouter(AdminNoticeView)}/>
                    <Route path="/admin/notice/write" component={withRouter(AdminNoticeWrite)}/>
                    <Route path="/admin/notice/update/:nno" component={withRouter(AdminNoticeUpdate)}/>
                    <Route path="/admin/qna/page/:page" component={withRouter(AdminQnaList)}/>
                    <Route path="/admin/qna/detail/:qno" component={withRouter(AdminQnaView)}/>
                </div>
               </>
        )
    }

}



export default withRouter(Admin);

