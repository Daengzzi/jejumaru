import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import AuthService from "../../services/authService";
import $ from "jquery";

class AnswerUpdate extends Component{
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

        $("#btn-admin_update_answer").on("click", ()=>{
            answerUp();
        });

        function answerUp() {

            let data = {
                qanswer: $("#qanswer").val()

            };

            $.ajax({
                type: "PUT",
                url: "/api/qanda/answer_up_"+qno,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                console.log(qno+", "+data.qanswer);
                alert("수정이 완료되었습니다.");
                // alert(qno+", "+data.qanswer);
                window.location.href = "/admin/qna/detail/"+qno;
            }).fail(function(error){
                // alert("실패");
                alert(JSON.stringify(error));
            });

        }
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, groups, isLoading } = this.state;
        return(
            <>
            <tr>
                <td className="textBox" colSpan="2">

                    <div className="review-write">
                        <div className="write-wrap">

                            <div className="username"><p>운영자</p></div>
                            <form>
                                <input type="hidden" id="qno" value={groups.qno }/>
                                <textarea className="textwrite" id="qanswer" defaultValue={groups.qanswer}></textarea>
                            </form>


                            <br/>
                        </div>
                    </div>

                    <button id="btn-admin_update_answer" className="ansBtn"> 수정</button>

                </td>
            </tr>
            </>
        );
    }
}

export default withRouter(AnswerUpdate);