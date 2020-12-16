import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import "./qnaWrite.css";
import AuthService from "../services/authService";
import $ from "jquery";
import {format} from "date-fns";

class QnaWrite extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        $("#btn-qanda_save").on("click", ()=>{
            save();
        });

        function save(){
            let data = {
                qtitle: $("#qtitle").val(),
                qcontent: $("#qcontent").val(),
                qmno:$("#qmno").val()
            };

            $.ajax({
                type: "POST",
                url: "/api/qanda",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                alert("글쓰기가 완료되었습니다.");
                // console.log(resp);
                window.location.href = "/jejumaru/qna/page/1";
            }).fail(function(error){

                //alert("실패");
                alert(JSON.stringify(error));
            });
        }
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <section style={{marginBottom: "100px",position: "relative", left: "10%", width: "80%"}}>


    <div className="noticeTitle">
        <h2><Link to="/jejumaru/qna/page/1">Q & A</Link></h2>
        <hr className="hr3color"/>
    </div>

    <form>

        <div className="noticeTable">
            <table>
            <tr>
            <td style={{textAlign: 'left', color: 'gray', fontSize: '14px'}}>{currentUser?.username}</td>
                    <td style={{textAlign: 'right',  color: 'gray', fontSize: '14px'}}>{format(new Date(), 'yyyy/MM/dd')}</td>
    </tr>
    <tr>
    <th colspan="2">
    <div className="inputTitle">
    <input type="hidden" id="qmno" value={currentUser?.id}/>
    <a>제목</a><input type = "text" id = "qtitle"/>
    </div>
    </th>
    </tr>
    <tr>
    <td className="contentBox" colspan="2">
    <textarea name = "qcontent"className="form-control summernote" rows="5" id="qcontent"></textarea>
    </td>
    </tr>

    </table>
    </div>
    </form>
    <button id="btn-qanda_save" className="submitBtn">등록하기</button>
    <Link to="/jejumaru/qna/page/1"><button className="listBtn">목록보기</button></Link>
</section>

// <script>
//     $('.summernote').summernote({
//         tabsize: 2,
//         height: 300
//     });
// </script>



        );
    }
}

export default withRouter(QnaWrite);
