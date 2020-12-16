import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import "./noticeWrite.css";
import { format } from 'date-fns';
import $ from "jquery";

class NoticeWrite extends Component{

    componentDidMount() {

        $("#btn-notice_save").on("click", ()=>{
            save();
        });

        function save(){
            let data = {
                ntitle: $("#ntitle").val(),
                ncontent: $("#ncontent").val()
            };

            $.ajax({
                type: "POST",
                url: "/api/notice",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                alert("글쓰기가 완료되었습니다.");
                // console.log(resp);
                console.log(data.ntitle+", "+data.ncontent);
                window.location.href = "/jejumaru/notice/page/1";
            }).fail(function(error){
                console.log(data.ntitle+", "+data.ncontent);

                //alert("실패");
                alert(JSON.stringify(error));
            });
        }
    }

    render() {
        return (
    <section style={{marginBottom: '100px',position: "relative", left: "10%", width: "80%"}}>
    <div className="noticeTitle">
        <h2><Link to="/jejumaru/notice/page/1">공지사항</Link>

        </h2>
        <hr className="hr3color"/>
    </div>

    <form >

        <div className="noticeTable">
            <table>
                <tr>
                    <td style={{textAlign: 'left', color: 'gray', fontSize: '14px'}}>운영자</td>
                    <td style={{textAlign: 'right',  color: 'gray', fontSize: '14px'}}>{format(new Date(), 'yyyy/MM/dd')}</td>
                </tr>
                <tr>
                    <th colspan="2">
                        <div className="inputTitle">
                            <a>제목</a><input type = "text" placeholder="제목을 입력해주세요." id = "ntitle"/>
                        </div>
                    </th>
                </tr>
                <tr>
                    <td className="contentBox" colspan="2">
                        <textarea name = "ncontent"className="form-control summernote" rows="5" id="ncontent"></textarea>

                    </td>
                </tr>

            </table>
        </div>
    </form>
    <button id="btn-notice_save" className="submitBtn">등록하기</button>

    <Link to="/jejumaru/notice/page/1"><button className="listBtn">목록보기</button></Link>

</section>

        );
    }
}

export default withRouter(NoticeWrite);
