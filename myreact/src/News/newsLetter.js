import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import './newsletter.css';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";
import $ from "jquery";
const regex = /^[0-9]{0,11}$/;
//let tel = $('input[name=tel]').text();

let payChk = false;
let userid;

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const tel = value => {
    if (value.length != 11 || regex.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                The tel must be only numbers and 11 characters.
            </div>
        );
    }
};

function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    if(document.getElementById('tel').value.length == 11) {
        const {IMP} = window;
        IMP.init('imp24214512');


        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: 100,                                 // 결제금액
            name: 'NewsLetter',                  // 주문명
            buyer_name: userid.username,
            buyer_tel: document.getElementById('tel').value,                   // 구매자 전화번호
            buyer_email: ""
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    } else {
        alert("연락처를 정확히 입력해주세요.");
    }
}

/* 3. 콜백 함수 정의하기 */
function callback(response) {
    const {
        success,
        merchant_uid,
        error_msg
    } = response;

    if (success) {
        alert('결제 성공');
        payChk = true;
        document.getElementById('pay-text').innerText = '결제완료';
        document.getElementById("pay-button").setAttribute('disabled','disabled');
    } else {
        alert(`결제 실패: ${error_msg}`);
    }
}


class NewsLetter extends Component {

    constructor(props) {
        super(props);
        this.handleSub = this.handleSub.bind(this);

        this.state = {
            username: "",
            loading: false,
            message: ""
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        userid = user;
        if (user) {
            this.setState({
                username: user.username
            });
        }
    }

    handleSub(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if(payChk) {
            if (this.checkBtn.context._errors.length === 0) {
                AuthService.subInfo(this.state.username).then(
                    () => {
                        this.props.history.push("/jejumaru");
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
            } else {
                this.setState({
                    loading: false
                });
            }
        } else {
            alert("결제를 완료하세요.");
            this.setState({
                loading: false
            });
        }
    }


    render() {
        return (

            <div className="tile">
                <div className="letter1">
                    <h3>제주마루 뉴스레터 정기구독 서비스💌</h3>
                    <img src={'https://api.cdn.visitjeju.net/photomng/imgpath/201810/17/41209f96-3700-4de3-8545-347a602229e2.jpg'}/><br/>
                    제주마루에서 '뉴스레터' 월 정기구독 서비스를 실시합니다.<br/>
                    연락처를 입력 후 구독하기(결제)를 눌러 뉴스레터를 구독신청하시면 제주마루의 알찬 소식을 매월 1회 메일로 발송해 드립니다.<br/>
                    많은 구독 부탁드립니다.<br/><br/><br/>

                    월 구독료 : 100원(부가세 포함)<br/>
                    뉴스레터 내용 : 제주마루의 이벤트/공지사항, 제주도의 행사정보, 각종 명소의 소식 등<br/>
                </div>
                <div className="letter2">
                    <label>연락처</label>
                    <input
                        type="text"
                        className="text-justify text-left"
                        name="tel"
                        id="tel"
                        style={{width: "31%"}}
                        validations={[required, tel]}

                    />
                    <button
                        type="button"
                        onClick={onClickPayment}
                        style={{marginLeft: '20px', marginTop: '20px', width: '150px', height: '50px', backgroundColor: 'orange', border: 'none'}}
                        className="btn btn-primary btn-block"
                        id="pay-button"
                    >
                        <span id="pay-text">구독하기(결제)</span>
                    </button>
                    <Form
                        onSubmit={this.handleSub}
                        ref={c => {
                            this.form = c;
                        }}>
                        <label className="form-group">
                            <input
                                type="hidden"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                            />
                        </label>
                        <label className="form-group">
                            <button
                                style={{marginLeft: '10px', marginTop: '20px', marginBottom: '50px', width: '150px', height: '50px', backgroundColor: 'orange', border: 'none'}}
                                className="btn float-right btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>제출</span>
                            </button>
                        </label>
                        {this.state.message && (
                            <label className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </label>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />

                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(NewsLetter);