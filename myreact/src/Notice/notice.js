import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import "./noticeList.css";
import AuthService from '../services/authService';
import NoticePagination from '../Pagination/noticePagination';

class Notice extends Component{
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
                 <section style={{marginBottom: '100px'}}>
                <div>

                </div>

                <div className="noticeWrap">
                    <div className="titleh2">
                        <h2>공지사항</h2>
                        <hr className="hr3color"/>
                    </div>

                    <div className="noticetabWrap">
                    <Route path="/jejumaru/notice/page/:page" component={withRouter(NoticePagination)}/>
                <br/>


                    {/*<% if(session.getAttribute("id") == null) {%>--%>*/}
                    {/*    <%-- ${sessionScope.id eq null } --%>*/}
                    {/*    <%--            <% } else if(session.getAttribute("id").equals("admin")) { %>--%>*/}
                        {showAdminBoard && (
                            <Link to="/jejumaru/notice/write">
                                <button className="writeBtn">신규등록</button>
                            </Link>
                        )}

            {/*<%--            <% } else {}%>--%>*/}


{/*<%--            <ul class="pagination justify-content-center">--%>*/}
{/*<%--                <c:choose>--%>*/}
{/*<%--                    <c:when test="${notices.first}">--%>*/}
{/*<%--                        <li class="page-item disabled"><a class="page-link" href="?page=${notices.number - 1}">이전</a></li>--%>*/}
{/*<%--                    </c:when>--%>*/}
{/*<%--                    <c:otherwise>--%>*/}
{/*<%--                        <li class="page-item"><a class="page-link" href="?page=${notices.number - 1}">이전</a></li>--%>*/}
{/*<%--                    </c:otherwise>--%>*/}
{/*<%--                </c:choose>--%>*/}


{/*<%--                <c:choose>--%>*/}
{/*<%--                    <c:when test="${notices.last}">--%>*/}
{/*<%--                        <li class="page-item disabled"><a class="page-link" href="?page=${notices.number + 1}">다음</a></li>--%>*/}
{/*<%--                    </c:when>--%>*/}
{/*<%--                    <c:otherwise>--%>*/}
{/*<%--                        <li class="page-item"><a class="page-link" href="?page=${notices.number + 1}">다음</a></li>--%>*/}
{/*<%--                    </c:otherwise>--%>*/}
{/*<%--                </c:choose>--%>*/}

{/*<%--            </ul>--%>*/}

        </div>
    </div>

</section>
        );
    }
}

export default withRouter(Notice);
