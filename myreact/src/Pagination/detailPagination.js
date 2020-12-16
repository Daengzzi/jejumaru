import React, { Component } from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import ReviewBody from '../Review/reviewBody';

class DetailPagination extends Component{

    state = {
        isLoading: true,
        groups: [],
        param: "",
        curPage: "",
        sort: "detail/pno/"
    };

    async componentDidMount() {
        const pno = this.props.match.params.pno;
        const response = await fetch('/api/review/' + pno +'?page='+(this.props.match.params.page-1));
        const body = await response.json();
        const page = this.props.match.params.page;
        this.setState({groups: body, isLoading: false, param: pno, curPage: page})
    }

    render() {
        const {groups, isLoading, param, curPage, sort} = this.state;
        let totalPage = groups.totalPages;
        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }
        const writePages = 10;
        let url = "/jejumaru/" + sort + param + "/page/";

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
                <Route path="/jejumaru/detail/pno/:pno/page/:page" component={withRouter(ReviewBody)}/>
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

export default withRouter(DetailPagination);
