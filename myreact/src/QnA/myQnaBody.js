import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import { format } from 'date-fns';
import AuthService from "../services/authService";

class MyQnaBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            isLoading: true,
            groups: [],
            curPage: "",
            sort: "myqna"
        };
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        const response = await fetch('/api/qanda/qanda_list/' + user.id + "?page="+(this.props.match.params.page-1));
        const body = await response.json();
        const page = this.props.match.params.page;
        this.setState({groups: body, isLoading: false, curPage: page})
    }

    render(){
        const {currentUser, showModeratorBoard, showAdminBoard,groups, isLoading, curPage, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        return(
            groups.content.map(group => {
                if(group.qanswer == null) {
                    return <tr>
                        <td className="col-p1">{group.qno}</td>

                        <td className="col-p7 daoTitle"><Link
                            to={"/jejumaru/qna/detail/" + group.qno}>{group.qtitle}</Link></td>

                        <td className="col-p1">{group.user.mid}</td>
                        <td className="col-p1">{group.qviewcnt}</td>
                        <td className="col-p2 last">{group.qdate.split("T")[0]}</td>
                    </tr>
                } else {
                    return <tr>
                        <td className="col-p1">{group.qno}</td>
                        <td className="col-p7 daoTitle"><Link className="after"
                                                              to={"/jejumaru/qna/detail/" + group.qno}>
                            [답변완료]{group.qtitle}</Link></td>
                        <td className="col-p1">{group.user.mid}</td>
                        <td className="col-p1">{group.qviewcnt}</td>
                        <td className="col-p2 last">{group.qdate.split("T")[0]}</td>
                    </tr>
                }
            })
        );
    }


}

export default withRouter(MyQnaBody);