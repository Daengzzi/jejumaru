import React, { Component } from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import AdminQnaBody from '../Admin/QnA/adminQnaBody';

class AdminQnaPagination extends Component{

    state = {
        isLoading: true,
        groups: [],
        curPage: "",
        sort: "qna"
    };

    async componentDidMount() {
        const response = await fetch('/api/qanda/qanda_list?page='+(this.props.match.params.page-1));
        const body = await response.json();
        const page = this.props.match.params.page;
        this.setState({groups: body, isLoading: false, curPage: page})
    }

    render() {
        const {groups, isLoading, curPage, sort} = this.state;
        let totalPage = groups.totalPages;
        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }
        const writePages = 10;
        let url = "/admin/" + sort + "/page/";

        let start_page = ((Math.floor((curPage - 1) / writePages)) * writePages) + 1;
        let end_page = start_page + writePages - 1;

        if (end_page >= totalPage) {
            end_page = totalPage;
        }

        let first;
        let prev;
        let next;
        let last;
        let buttons = [];

        if (curPage > 1) {
            first =
                <li><Link to={url + "1"} class='tooltip-top' title='처음'><i class='fa fa-angle-double-left'></i></Link>
                </li>;
        }

        if (start_page > 1) {
            prev = <li><Link to={url + (start_page - 1)} class='tooltip-top' title='이전'><i class='fa fa-angle-left'></i></Link>
            </li>;
        }

        if (totalPage > 1) {
            for (let k = start_page; k <= end_page; k++) {
                if (curPage != k)
                    buttons.push(<li><Link to={url + k}>{k}</Link></li>);
                else
                    buttons.push(<li><Link class='active tooltip-top' title='현재페이지'
                                           style={{pointerEvents: 'none', cursor: 'default'}}>{k}</Link></li>);
            }
        }

        if (totalPage > end_page) {
            next = <li><Link to={url + (end_page + 1)} class='tooltip-top' title='다음'><i class='fa fa-angle-right'></i></Link>
            </li>;
        }

        if (curPage < totalPage) {
            last = <li><Link to={url + totalPage} class='tooltip-top' title='맨끝'><i
                class='fa fa-angle-double-right'></i></Link></li>;
        }
        return (
            <>
                <table className="tab">
                    <tr>
                        <th className="col-p1">글번호</th>
                        <th className="col-p7">제목</th>
                        <th className="col-p1">작성자</th>
                        <th className="col-p1">조회수</th>
                        <th className="col-p2 last">작성일</th>
                    </tr>
                    <Route path="/admin/qna/page/:page" component={withRouter(AdminQnaBody)}/>
                </table>
                <div className="center" style={{marginTop: '20px'}}>
                    <ul className="pagination">
                        {first}
                        {prev}
                        {buttons}
                        {next}
                        {last}
                    </ul>
                </div>
            </>
        );
    }
}

export default withRouter(AdminQnaPagination);






