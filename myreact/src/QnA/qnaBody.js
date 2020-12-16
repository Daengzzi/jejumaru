import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import { format } from 'date-fns';

class QnaBody extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch('/api/qanda/qanda_list?page='+(this.props.match.params.page-1));
        const body = await response.json();
        this.setState({groups: body, isLoading: false})
    }

    render(){
        const {groups, isLoading} = this.state;

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

export default withRouter(QnaBody);