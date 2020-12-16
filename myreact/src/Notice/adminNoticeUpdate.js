import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../Admin/adminNoticeUpdate.css';
import AuthService from "../services/authService";
import Pagination from "../Pagination/memberListPagination";
import $ from 'jquery';

class AdminNoticeUpdate extends Component{

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
        
        $("#btn-admin_notice_update").on("click", ()=>{
            update();
        });

        function update(){

            let nno = $("#nno").val();

            let data = {
                ntitle: $("#ntitle").val(),
                ncontent: $("#ncontent").val()
            };

            $.ajax({
                type: "PUT",
                url: "/api/notice/"+nno,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(resp){
                alert("글수정이 완료되었습니다.");
                console.log(data.ntitle+", "+data.ncontent);
                window.location.href = "/admin/notice/detail/"+nno;
            }).fail(function(error){
                // alert("실패");
                console.log(data.ntitle+", "+data.ncontent);
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

        <form>
            <input type="hidden" id="nno" value={groups.nno}/>
            <div className="noticeTable">
                <table>
                    <tr>
                        <td className="f_td">no.{groups.nno}<br/>운영자</td>
                        <td style={{textAlign: 'right', color: 'gray', fontSize: '14px'}}>
                            <br/>{groups.ndate.split('T')[0]}<br/>조회수:{groups.nviewcnt}</td>
                    </tr>
                    <tr>
                        <th colSpan="2">
                            <input type="text" name="ntitle" id="ntitle" defaultValue={groups.ntitle}/>
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="2" className="contentBox" style={{textAlign: 'left'}}>
                            <textarea name="ncontent" className="form-control summernote" rows="5"
                                      id="ncontent">{groups.ncontent}</textarea>
                        </td>
                    </tr>

                </table>
            </div>
        </form>
        <button id="btn-admin_notice_update" className="updateBtn">수정하기</button>
        <Link to="/admin/notice/page/1">
            <button className="listBtn">목록보기</button>
        </Link>

    </div>

    {/*<script>*/}
    {/*    $('.summernote').summernote({*/}
    {/*        tabsize: 2,*/}
    {/*        height: 300*/}
    {/*    });*/}
    {/*</script>*/}
    
            </>
        );
    }
}


export default withRouter(AdminNoticeUpdate);

