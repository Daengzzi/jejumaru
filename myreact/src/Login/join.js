import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from '../services/authService';
import './join.css';

let pwChk = false;
let confirm = false;
let emailChk = false;

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        emailChk = false;
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    } else {
        emailChk = true;
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vpasswordChk = value => {
    if (!pwChk) {
        return (
            <div className="alert alert-danger" role="alert">
                The password does not match.
            </div>
        );
    }
};


const vname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vnumber = value => {
    if (!confirm) {
        return (
            <div className="alert alert-danger" role="alert">
                인증번호가 일치하지 않습니다.
            </div>
        );
    }
};

class Join extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.confirmMail = this.confirmMail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordChk = this.onChangePasswordChk.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            passwordChk: "",
            name: "",
            successful: false,
            message: "",
            randomNumber: "",
            confirmNumber: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordChk(e) {
        this.setState({
            passwordChk: e.target.value
        });
        if (this.state.password == e.target.value){
            pwChk = true;
        } else {
            pwChk = false;
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNumber(e) {
        this.setState({
            confirmNumber: e.target.value
        });
        if(this.state.randomNumber === e.target.value){
            confirm = true;
        } else {
            confirm = false;
        }
    }

    confirmMail(){
        if(emailChk == true) {
            alert("인증번호가 발송되었습니다.");
            document.getElementById("confirm-input").style.display = "block";
            AuthService.confirmMail(this.state.email).then(
                response => {
                    this.setState({
                        randomNumber: String(response.data)
                    });
                })
        } else {
            alert("이메일을 정확히 입력해주세요.");
        }
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.name
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }


    render() {
        return (
            <body className="join-body">
            <Link className="navbar-brand logo" to="/jejumaru">
                <i className="fas fa-home" style={{position:"fixed", right:"45px", top:"35px" ,color:"#fff", fontSize:"30px"}}/>
            </Link>
            <div className="tile" style={{marginLeft: '-30px',marginTop: '0px', height: '50%'}}>
                <div className="tile-header">
                    <h2 style={{color: 'darkgray', opacity: '.75', fontSize: '3rem', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', height: '60%'}}>SIGN UP</h2>
                </div>

                <div className="tile-body" style={{marginTop: "-100px", marginBottom: "-20px",height: "40%"}}>
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <i className="material-icons">person</i>
                                    <label htmlFor="username">ID</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                        autofocus="true"
                                    />
                                    <span className="underline"></span>
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">person</i>
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        type="name"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        validations={[required, vname]}
                                    />
                                    <span className="underline"></span>
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">lock</i>
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        style={{fontFamily: "'Open Sans', sans-serif"}}
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                    <span className="underline"></span>
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">lock</i>
                                    <label htmlFor="passwordChk">Confirm Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="passwordChk"
                                        style={{fontFamily: "'Open Sans', sans-serif"}}
                                        value={this.state.passwordChk}
                                        onChange={this.onChangePasswordChk}
                                        validations={[required, vpasswordChk]}
                                    />
                                    <span className="underline"></span>
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">message</i>
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                    <span className="underline"></span>
                                </div>

                                <button type="button" className="btn btn-warning btn-block" onClick={this.confirmMail}><span>Confirm</span></button>
                                <div className="form-group" id="confirm-input" style={{display: 'none'}}>
                                    <i className="material-icons">key</i>
                                    <label htmlFor="email" style={{marginTop: '10px'}}>인증번호</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="num"
                                        name="confirmNumber"
                                        style={{marginTop: '10px', backgroundColor: 'whiteSmoke'}}
                                        value={this.state.confirmNumber}
                                        onChange={this.onChangeNumber}
                                        validations={[required, vnumber]}
                                    />
                                    <span className="underline"></span>
                                </div>
                                <label className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign Up</span>
                                    </button>
                                </label>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
            </body>
        );
    }
}

export default withRouter(Join);