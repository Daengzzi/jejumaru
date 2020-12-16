import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import "./qnaUpdate.css";
import $ from "jquery";
import AuthService from "../services/authService";

class QnaUpdate extends Component{
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

        $("#btn-qanda_update").on("click", ()=>{
            update();
        });

        function update(){

            let data = {
                qtitle: $("#qtitle").val(),
                qcontent: $("#qcontent").val()
            };

            $.ajax({
                type: "PUT",
                url: "/api/qanda/"+qno,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                alert("글수정이 완료되었습니다.");
                window.location.href = "/jejumaru/qna/detail/"+qno;
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
    <form>
        <input type="hidden" id="qno" value={groups.qno }/>
        <div className="noticeTable">
            <table>
                <tr>
                    <td style={{textAlign: 'left', color: 'gray', fontSize: '14px'}}>{groups.user.mid}</td>
                    <td style={{textAlign: 'right',  color: 'gray', fontSize: '14px'}}>{groups.qdate.split("T")[0]}</td>
                </tr>
                <tr>
                    <th colspan="2">
                        <input type = "text" id = "qtitle" defaultValue={groups.qtitle}/>
                    </th>
                </tr>
                <tr>
                    <td colspan="2" className="contentBox" style={{textAlign: 'left'}}>
                        <textarea name="qcontent" className="form-control summernote" rows="5"  id="qcontent">{groups.qcontent}</textarea>
                    </td>
                </tr>
            </table>
        </div>
    </form>

    <button id="btn-qanda_update" className="updateBtn">수정하기</button>
    <Link to="/jejumaru/qna/page/1"><button className="listBtn">목록보기</button></Link>

</section>


        );
    }
}

export default withRouter(QnaUpdate);
