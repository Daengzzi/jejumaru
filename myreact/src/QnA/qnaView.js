import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import "./qnaView.css";
import Answer from "./answer";
import AnswerUpdate from "./answerUpdate";
import AuthService from "../services/authService";
import $ from "jquery";

class QnaView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            isLoading: true,
            groups: [],
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

        const qno = this.props.match.params.qno;
        const response = await fetch('/api/qanda/' + qno);
        const body = await response.json();
        this.setState({groups: body, isLoading: false})
        $("#btn-qanda_delete").on("click", ()=>{
            deleteById();
        });

        function deleteById(){
            let qno = $("#qno").val();

            $.ajax({
                type: "DELETE",
                url: "/api/qanda/"+qno,
                dataType: "json"
            }).done(function(resp){
                console.log(qno+", ");
                alert("삭제가 완료되었습니다.");
                window.location.href = "/jejumaru/qna/page/1";
            }).fail(function(error){
                // alert("실패");
                alert(JSON.stringify(error));
            });
        }
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, groups, isLoading } = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        return (
        <section style={{marginBottom: '100px', position: "relative", left: "10%", width: "80%"}}>

    <div className="noticeTitle">
        <h2><Link to="/jejumaru/qna/page/1">Q & A</Link></h2>
        <hr className="hr3color"/>
    </div>

    <div className="noticeTable">
        <table>
            <tr>
                <td className="f_td">no.<span id ="qno">{groups.qno}</span><br/>{groups.user.mid}</td>
                <td style={{textAlign: 'right',  color: 'gray', fontSize: '14px'}}><br/>{groups.qdate.split("T")[0] }<br/>조회수:{groups.qviewcnt }</td>
            </tr>
            <tr>
                <th colspan="2">{groups.qtitle }</th>
            </tr>
            <tr>
                <td class = "contentBox" colspan="2" style={{textAlign: 'left', height:"100%"}}>

                    {groups.qcontent }
                </td>
            </tr>
                <Route exact path="/jejumaru/qna/detail/:qno" component={withRouter(Answer)}/>
            <Route exact path="/jejumaru/qna/detail/:qno/au" component={withRouter(AnswerUpdate)}/>
        </table>
    </div>
</section>

        );
    }
}

export default withRouter(QnaView);
