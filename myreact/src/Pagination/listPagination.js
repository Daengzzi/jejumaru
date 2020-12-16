import React, { Component } from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import ListBody from '../List/ListBody';

class ListPagination extends Component{

    state = {
        isLoading: true,
        groups: [],
        param: "",
        curPage: "",
        sort: "list/cate/"
    };

    async componentDidMount() {
        const cate = this.props.match.params.cate;
        let label = "";
        if(cate == 'jeju')
            label = '/jeju';
        if(cate == 'seo')
            label = '/seo';
        if(cate == 'island')
            label = '/island';
        const response = await fetch('/api/list' + label +'?page='+(this.props.match.params.page-1));
        const body = await response.json();
        const page = this.props.match.params.page;
        this.setState({groups: body, isLoading: false, param: cate, curPage: page})
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
            <div className="row filtr-container" style={{minHeight: '1200px'}}>
                <Route path="/jejumaru/list/cate/:cate/page/:page" component={withRouter(ListBody)}/>
            </div>
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

export default withRouter(ListPagination);
