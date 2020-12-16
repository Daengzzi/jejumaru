import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import AuthService from "../services/authService";
import Pagination from "../Pagination/memberListPagination";
import "./qnaView.css";
import $ from "jquery";

class Answer extends Component{
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

        $("#btn-admin_qanda_answer").on("click", ()=>{
            answer();
        });

        $("#btn-qanda_delete").on("click", ()=>{
            deleteByIdqna();
        });

        $("#btn-answer_delete").on("click", ()=>{
            answerDel();
        });

        function answer() {
            let data = {
                qanswer: $("#qanswer").val()
            };


            $.ajax({
                type: "PUT",
                url: "/api/qanda/answer_"+qno,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                // console.log("qno : "+qno);
                // console.log("qanswer : "+data.qanswer);
                alert("답변작성이 완료되었습니다.");
                window.location.href = "/jejumaru/qna/detail/"+qno;
            }).fail(function(error){
                // alert("실패");
                console.log(data.qanswer);
                alert(JSON.stringify(error));
            });
        }

        function deleteByIdqna(){

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

            function answerDel() {

                let data = {
                    qanswer: $("#qanswerdata").val()

                };

                $.ajax({
                    type: "PUT",
                    url: "/api/qanda/answer_del_" + qno,
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                }).done(function (resp) {
                    console.log(qno + ", " + data.qanswer);
                    alert("삭제가 완료되었습니다.");
                    // alert(qno + ", " + data.qanswer);
                    window.location.href = "/jejumaru/qna/detail/" + qno;
                }).fail(function (error) {
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
            <>
            { groups.qanswer ? showAdminBoard ? (
                <tr>
                <td className="textBox" colSpan="2" style={{height:'100px'}}>
                    <div className="write-wrap" style={{height:'100px'}}>
                        <div className="username">
                            <p>운영자</p>

                            <div className="admin_upde">
                                <button className="ansDelBtn" id="btn-answer_delete">답변 삭제</button>
                                <Link to={"/jejumaru/qna/detail/"+groups.qno + "/au"}>
                                    <button className="ansUpBtn">답변 수정</button>
                                </Link>
                            </div>

                        </div>

                        <div className="contentBox"
                             style={{float:'left', paddingTop:'20px', height:'100px !important'}}>{groups.qanswer}</div>
                    </div>
                </td>
                </tr>
            ) :(
                <tr>
                    <td className="textBox" colSpan="2" style={{height: '100px'}}>
                        <div className="write-wrap" style={{height:'100px'}}>
                            <div className="username"><p>운영자</p></div>
                            <div className="contentBox"
                                 style={{float:'left', paddingTop:'20px', height:'100px !important'}}>{groups.qanswer}</div>
                        </div>
                    </td>
                </tr>
            ) : showAdminBoard ? (
                    <tr>
                        <td className="textBox" colSpan="2">
                            <div className="review-write" style={{marginBottom:"0"}}>
                                <div className="write-wrap">
                                    <div className="username" style={{display: "block"}}><p>운영자</p></div>
                                    <textarea className="textwrite" id="qanswer" placeholder="답변을 적어주세요." style={{width: "80%"}}></textarea>
                                    <button id="btn-admin_qanda_answer" className="ansBtn"> 입력</button>
                                </div>

                            </div>


                        </td>
                        </tr>
                ) : (
                    <tr>
                        <td colSpan="2" style={{color : 'gray'}}>빠른 답변 드리겠습니다.</td>
                    </tr>
                )
    }
    { groups.qanswer ? groups.user.mid == currentUser?.username ? (
            <Link to="/jejumaru/qna/page/1">
                <button className="listBtn"style={{marginRight:'150px'}}>목록보기</button>
            </Link>
    ) : showAdminBoard ? (
        <Link to="/jejumaru/qna/page/1">
            <button className="listBtn" style={{marginRight:'150px'}}>목록보기</button>
        </Link>
    ) : (
        <Link to="/jejumaru/qna/page/1">
            <button className="listBtn" style={{marginRight:'150px'}}>목록보기</button>
        </Link>
    ) : (
        <>

            <Link to={"/jejumaru/qna/update/" + groups.qno}>
                <button className="updateBtn">수정하기</button>
            </Link>

            <button className="deleteBtn" id="btn-qanda_delete">삭제하기</button>

            <Link to="/jejumaru/qna/page/1">
                <button className="listBtn">목록보기</button>
            </Link>
        </>
        )}
            </>
        );
    }
}

export default withRouter(Answer);
