import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../Admin/adminNoticeView.css';
import AuthService from "../services/authService";
import Pagination from "../Pagination/memberListPagination";
import $ from 'jquery';

class AdminNoticeView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            groups: [],
        };
    }

    async componentDidMount() {

        const nno = this.props.match.params.nno;
        const response = await fetch('/api/notice/' + nno);
        const body = await response.json();
        this.setState({groups: body, isLoading: false})

        $("#btn-admin_notice_delete").on("click", () => {
            deleteById();
        });

        function deleteById(){
            let nno = $("#nno").text();

            $.ajax({
                type: "DELETE",
                url: "/api/notice/"+nno,
                dataType: "json"
            }).done(function(resp){
                alert("삭제가 완료되었습니다.");
                window.location.href = "/admin/notice/page/1";
            }).fail(function(error){
                // alert("실패");
                alert(JSON.stringify(error));
            });
        }
    }

    render() {
        const { groups, isLoading } = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        return (
            <>

    <div id="admin-section">
        <div className="noticeTitle">
            <h2><Link to="/admin/notice/page/1">공지사항</Link></h2>
            <hr className="hr3color"/>
        </div>

        <div className="noticeTable">
            <table>
                <tr>
                    <td className="f_td">no.<span id="nno">{groups.nno}</span><br/>운영자</td>
                    <td style={{
                        textAlign: 'right',
                        color: 'gray',
                        fontSize: '14px'
                    }}>{groups.ndate.split('T')[0]}<br/>조회수:{groups.nviewcnt}</td>
                </tr>
                <tr>
                    <th colSpan="2">{groups.ntitle}</th>
                </tr>
                <tr>
                    <td className="contentBox" colSpan="2" style={{textAlign: 'left'}}>
                        {groups.ncontent}
                    </td>
                </tr>

            </table>
        </div>

        {/*<button className="listBtn"*/}
        {/*       style="margin-right:200px;"*/}
        {/*        onclick="location.href='notice_list.do'">목록보기</button>*/}
            <>
                <Link to={"/admin/notice/update/" + groups.nno}>
                    <button className="updateBtn">수정하기</button>
                </Link>
                <button className="deleteBtn" id="btn-admin_notice_delete">삭제하기</button>
            </>
        <Link to="/admin/notice/page/1">
            <button className="listBtn">목록보기</button>
        </Link>

    </div>
            </>
        );
    }
}


export default withRouter(AdminNoticeView);

