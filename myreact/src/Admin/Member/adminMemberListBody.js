import React, { Component } from 'react';
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import '../admin.css';
import AuthService from "../../services/authService";


class AdminMemberList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            message: "",
            groups: [],
            param: "",
            curPage: "",
            sort: "member/",
            checkedBoxes: [],
        };
        this.deleteMembers = this.deleteMembers.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    deleteMembers = () => {
        if(window.confirm("정말 탈퇴시키겠습니까?")){
            this.setState({
                message: "",
                loading: true
            });

            AuthService.deleteMembers(this.state.checkedBoxes).then(
                () => {
                    alert("탈퇴 처리가 완료되었습니다.");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    toggleCheckbox = (e, item) => {
        if(e.target.checked){
            let arr = this.state.checkedBoxes;
            arr.push(item.mno);
            this.setState({ checkedBoxes: arr });
        } else {
            let items = this.state.checkedBoxes;
            items.splice(this.state.checkedBoxes.indexOf(item.mno),1);
            this.setState({checkedBoxes: items});
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/auth/memberlist');
        const body = await response.json();
        const page = this.props.match.params.page;
        
        this.setState({groups: body, isLoading: false, curPage: page})
    }

    render() {
        const {groups, isLoading, param, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }
        return (
            <>
            <table>
                <tr>
                    <th className="col-p1">선택</th>
                    <th className="col-p1">회원번호</th>
                    <th className="col-p1">아이디</th>
                    <th className="col-p1">이름</th>
                    <th className="col-p1">이메일</th>
                    <th className="col-p1 last">구독여부</th>
                </tr>
                {groups.content.map(group => {
                    if(group.roles.length == 1)
                   return <tr>
                        <td className="col-p1"><input type="checkbox" style={{zoom: "1.3"}} onChange={(e) => this.toggleCheckbox(e, group)}/></td>
                        <td className="col-p1">{group.mno}</td>
                        <td className="col-p1">{group.mid}</td>
                        <td className="col-p1">{group.mname}</td>
                        <td className="col-p1">{group.memail}</td>
                        <td className="col-p1 last">{group.mnews}</td>
                    </tr>
                })}
            </table>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.deleteMembers}
                    >
                        강제탈퇴
                    </button>
                </>
        );
    }
}


export default withRouter(AdminMemberList);

