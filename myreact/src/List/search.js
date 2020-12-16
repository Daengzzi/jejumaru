import React, { Component } from 'react';
import './bootstrap.min.css';
import './common.css';
import './styles.min.css';
import Pagination from '../Pagination/searchPagination';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';


class Search extends Component {

    state = {
        isLoading: true,
        groups: [],
        search: "",
        page: "",
        sort: "search/"
    };

    componentDidMount() {
        const search = this.props.match.params.search;

        const page = this.props.match.params.page;
        this.setState({isLoading: false, search: search, page: page})
    }

    render() {
        const {groups, isLoading, search, page, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}>Loading...</div>;
        }

        return (
            <div style={{minHeight: '1550px'}}>
                <div className="py-5">
                    <div className="container" style={{marginTop: '100px'}}>
                        <div className="filtr-controls text-center lead text-uppercase mb-3">
                            '<b>{search}</b>' 에 대한 검색결과입니다.
                        </div>
                        <Route path="/jejumaru/search/:search/page/:page" component={withRouter(Pagination)}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Search);
