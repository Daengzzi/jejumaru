import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import { format } from 'date-fns';

class NoticeBody extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch('/api/notice/notice_list?page='+(this.props.match.params.page-1));
        const body = await response.json();
        this.setState({groups: body, isLoading: false})
    }

    render(){
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        return(
            groups.content.map(group =>
                    <tr>
                        <td className="col-p1">{group.nno}</td>
                        <td className="col-p7 daoTitle"><Link to={"/jejumaru/notice/detail/"+group.nno}>{group.ntitle}</Link></td>
                        <td className="col-p1">운영자</td>
                        <td className="col-p1">{group.nviewcnt}</td>
                        <td className="col-p2 last">{group.ndate.split('T')[0]}</td>
                    </tr>
            )
        );
    }


}

export default withRouter(NoticeBody);