import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../admin.css';
import AuthService from "../../services/authService";
import Pagination from "../../Pagination/memberListPagination";


class AdminMemberList extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            isLoading: true,
            groups: [],
            param: "",
            sort: "memberlist/"
        };
    }

    logOut() {
        AuthService.logout();
        window.location.href = "/jejumaru";
    }

    async componentDidMount() {
        const response = await fetch('/api/auth/memberlist');
        const body = await response.json();
        const page = this.props.match.params.page;

        this.setState({groups: body, isLoading: false, curPage: page})
    }

    render() {
        const {groups, isLoading, param, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }
        return (
            <>
                <div id="admin-section">
                    <h2>회원 정보</h2><br/>
                        <Route path="/admin/member/page/:page" component={withRouter(Pagination)}/>
                </div>
            </>
        );
    }
}


export default withRouter(AdminMemberList);

