import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import "./qnaList.css";
import AuthService from "../services/authService";
import QnaPagination from '../Pagination/qnaPagination';
import $ from "jquery";

class QnA extends Component{
    constructor(props) {
        super(props);
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

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            
            <section style={{marginBottom: "100px"}}>
           <div className="qandaWrap">
           <div className="titleh2">
            <h2>Q & A</h2>
            <hr className="hr3color"/>
        </div>

        <div className="qandatabWrap">
            <Route path="/jejumaru/qna/page/:page" component={withRouter(QnaPagination)}/>
            <br/>



            { currentUser ? (
                    <Link to="/jejumaru/qna/write">
                        <button className="writeBtn">신규등록</button>
                    </Link>
            ) : (
                <div className="comeJoin"><h3 style={{color:'gray'}}>로그인 후 질문 가능합니다.</h3></div>
            )}

        </div>
    </div>

</section>


        );
    }
}

export default withRouter(QnA);
