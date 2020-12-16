import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import './Etc/ScrollToTop';
import logo from './Logo/logo.png';
import './Main/MainStyle2.css';
import './Main/MainStyle3.css';
import './Main/MainStyle4.css';
import './Main/MainStyle5.css';
import './fonts/simple-line-icons.min.css';
import './fonts/fontawesome5-overrides.min.css';
import './fonts/font-awesome.min.css';
import './fonts/fontawesome-all.min.css';
import './Main/MainStyle1.css';
import List from './List/list';
import Review from './Review/Review';
import Intro from './Intro/intro';
import Culture from "./Intro/culture";
import NewsLetter from './News/newsLetter';
import Search from './List/search';
import AuthService from './services/authService';
import Main from './Main/main';
import NoticeWrite from "./Notice/noticeWrite";
import NoticeList from "./Notice/notice";
import NoticeUpdate from "./Notice/noticeUpdate";
import NoticeView from "./Notice/noticeView";
import QnaWrite from "./QnA/qnaWrite";
import QnA from "./QnA/qna";
import QnaView from "./QnA/qnaView";
import QnaUpdate from "./QnA/qnaUpdate";
import MyQnaList from "./QnA/myQnaList";

import jquery from 'jquery';
import Input from "react-validation/build/input";
window.$ = window.jQuery=jquery;

let searchVal = "";

function Footer(){
    return(

        <footer id="footerpad" style={{backgroundColor : "lightgray"}} >
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-8 mx-auto">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item" ><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"
                                                                                                              style={{color : "orange"}}></i><i className="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a></li>
                            <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x" style={{color : "orange"}}></i><i className="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a></li>
                            <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x" style={{color : "orange"}}></i><i className="fa fa-instagram fa-stack-1x fa-inverse"></i></span></a></li>
                        </ul>
                        <p className="copyright text-muted text-center" style={{fontSize : "10px"}} >Copyright © JEJUMARU, All rights reserved.<br/></p>
                    </div>
                </div>
            </div>
        </footer>

    )
}

class Userpage extends Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    onChangeSearch(e) {
        searchVal = e.target.value;
    }

    handleKeyPress(e) {
        if(e.key === 'Enter'){
            this.buttonClick();
        }
    }

    buttonClick(e) {
        window.location.href = "/jejumaru/search/"+searchVal+"/page/1";
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

    denied(){
        alert('로그인 후 이용 가능합니다.');
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <>
                <nav className="navbar navbar-light navbar-expand-xl fixed-top bg-white clean-navbar">
                    <div className="container">
                        <Link className="navbar-brand logo" to="/jejumaru">
                            <img src={logo}/>
                        </Link>

                        <div className="float-left float-md-right mt-0 mt-md-0 search-area">
                            <Link>
                                <button type="button" className="bg-transparent border-0 p-0" onClick={this.buttonClick}>
                                    <i className="fas fa-search float-left search-icon"></i>
                                </button>
                            </Link>

                            <input className="float-left float-sm-right custom-search-input" type="search"
                                   placeholder="검색어를 입력하세요" name="searchVal"
                                   onChange={this.onChangeSearch} onKeyPress={this.handleKeyPress}/>
                        </div>

                        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false"
                                       href="#" style={{fontSize: "16px", color: "orange"}}>제주스토리</a>
                                    <div className="dropdown-menu"
                                         style={{borderStyle: "none", backgroundColor: "orange"}}>
                                        <Link className="dropdown-item" to="/jejumaru/intro"
                                              style={{color: "white"}}>소개</Link>
                                        <Link className="dropdown-item" to="/jejumaru/culture"
                                              style={{color: "white"}}>문화와 역사</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false"
                                       href="#"
                                       style={{fontSize: "16px", color: "orange"}}>제주플레이스</a>
                                    <div className="dropdown-menu"
                                         style={{borderStyle: "none", backgroundColor: "orange"}}>
                                        <Link className="dropdown-item" to="/jejumaru/list/cate/all/page/1"
                                              style={{color: "white"}}>전체</Link>
                                        <Link className="dropdown-item" to="/jejumaru/list/cate/jeju/page/1"
                                              style={{color: "white"}}>제주시</Link>
                                        <Link className="dropdown-item" to="/jejumaru/list/cate/seo/page/1"
                                              style={{color: "white"}}>서귀포시</Link>
                                        <Link className="dropdown-item" to="/jejumaru/list/cate/island/page/1"
                                              style={{color: "white"}}>섬 속의 섬</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false"
                                       href="#"
                                       style={{fontSize: "16px", color: "orange"}}>나의여행</a>
                                    <div className="dropdown-menu"
                                         style={{borderStyle: "none", backgroundColor: "orange"}}>

                                        {/*   <form name="mymno" id="mymno" action="My_write_list.do" method="post">
                              <input type="hidden" className="mno"/jejumaru/>
                              <a className="dropdown-item" href="javascript:void()" onclick="document.getElementById('mymno').submit();"
                               style={{color : "white"}}>내가 쓴 QNA</a>
                          </form> */}
                                        {/* <form name="myremno" id="myremno" action="myreview.do" method="post">
                              <input type="hidden" name="mno"/jejumaru/>
                              <a className="dropdown-item" href="javascript:void()" onclick="document.getElementById('myremno').submit();" style={{color : "white"}}>내가 쓴 리뷰</a>
                          </form> */}
                                        {currentUser ? (
                                            <>
                                                <Link className="dropdown-item" to="/jejumaru/myqna/page/1" style={{color: "white"}}>내가 쓴 QNA</Link>
                                            <Link className="dropdown-item" to="/jejumaru/newsletter"
                                                  style={{color: "white"}}>뉴스레터</Link>
                                                </>
                                        ) : (
                                            <>
                                            <Link className="dropdown-item" onClick={this.denied} style={{color: "white"}}>내가 쓴 QNA</Link>
                                            <Link className="dropdown-item" onClick={this.denied}
                                            style={{color: "white"}}>뉴스레터</Link>
                                            </>
                                        )}

                                    </div>
                                </li>

                                <li className="nav-item dropdown" style={{marginRight: "0px"}}>
                                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false"
                                       href="#"
                                       style={{fontSize: "16px", color: "orange"}}>고객센터</a>
                                    <div className="dropdown-menu"
                                         style={{borderStyle: "none", backgroundColor: "orange"}}>
                                        <Link className="dropdown-item" to="/jejumaru/qna/page/1"
                                           style={{color: "white"}}>QNA</Link>
                                        <Link className="dropdown-item" to="/jejumaru/notice/page/1"
                                           style={{color: "white"}}>공지사항</Link>
                                    </div>
                                </li>
                            </ul>
                            {currentUser ? showAdminBoard ? (<><Link id="adminIndex" style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}}
                                                                   to="/admin/member/page/1"> 관리자페이지 </Link>
                                <Link style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}} onClick={this.logOut} to="/">로그아웃</Link></>) : (
                                <>
                                    <Link id="update" style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}}
                                          to="/update"> 비밀번호수정 </Link>
                                    <Link style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}} onClick={this.logOut} to="/jejumaru">로그아웃</Link>
                                </>) : (
                                <>
                                    <Link id="login" style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}}
                                          to="/login"> 로그인 </Link>
                                    <Link id="join" style={{marginRight: "10px", fontSize: "14px", color: "#8a8a8a"}}
                                          to="/join">회원가입</Link>
                                </>
                            )}

                        </div>

                    </div>
                </nav>

                <Route exact path="/jejumaru" component={withRouter(Main)}/>
                <Route path="/jejumaru/newsletter" component={withRouter(NewsLetter)}/>
                <Route path="/jejumaru/intro" component={withRouter(Intro)}/>
                <Route path="/jejumaru/culture" component={withRouter(Culture)}/>
                <Route path="/jejumaru/search/:search/page/:page" component={withRouter(Search)}/>
                <Route path="/jejumaru/list/cate/:cate/page/:page" component={withRouter(List)}/>
                <Route path="/jejumaru/detail/pno/:pno/page/:page" component={withRouter(Review)}/>
                <Route path="/jejumaru/notice/write" component={withRouter(NoticeWrite)}/>
                <Route path='/jejumaru/notice/page/:page' component={withRouter(NoticeList)}/>
                <Route path='/jejumaru/notice/detail/:nno' component={withRouter(NoticeView)}/>
                <Route path='/jejumaru/notice/update/:nno' component={withRouter(NoticeUpdate)}/>
                <Route path="/jejumaru/qna/write" component={withRouter(QnaWrite)}/>
                <Route path='/jejumaru/qna/page/:page' component={withRouter(QnA)}/>
                <Route path='/jejumaru/qna/detail/:qno' component={withRouter(QnaView)}/>
                <Route path='/jejumaru/qna/update/:qno' component={withRouter(QnaUpdate)}/>
                <Route path='/jejumaru/myqna/page/:page' component={withRouter(MyQnaList)}/>
                <Footer/>
            </>

        );
    }
}

export default withRouter(Userpage);