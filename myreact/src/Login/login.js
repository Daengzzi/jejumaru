import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import Axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";
import './login.css';
import axios from "axios";


const { Kakao } = window;

const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
        success: function (authObj) {
            fetch("http://localhost:3000/", {
                method: "POST",
                body: JSON.stringify({
                    access_token: authObj.access_token,
                }),
            })

                .then(res => res.json())
                .then(res => {
                    alert(res.access_token);
                    localStorage.setItem("Kakao_token", res.access_token);
                    if(res.access_token) {
                        window.location.href = "http://localhost:3000";
                    }
                })
        },
        fail: function (err) {
            alert(JSON.stringify(err))
        },
    })
}

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
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
    }

    signup(res) {
        const googleresponse = {
            username: res.profileObj.googleId,
            email: res.profileObj.email,
            password: "jejumaru",
            name: res.profileObj.name,
        };

        axios.post('http://localhost:8080/jejumaru_war_exploded/api/auth/signup', googleresponse)
            .then((result) => {
                let responseJson = result;
                this.props.history.push("/jejumaru")
            });
    };

    render() {
        const responseGoogle = (response) => {
            let res = response.profileObj;
            this.signup(response);
        }

        return (
            <body className="login-body">
            <Link className="navbar-brand logo" to="/jejumaru">
                <i className="fas fa-home" style={{position:"fixed", right:"45px", top:"35px" ,color:"#fff", fontSize:"30px"}}/>
            </Link>
            <div className="tile" style={{marginLeft: '-30px',marginTop: '0px'}}>
                <div className="tile-header">
                    <h2 style={{color: 'darkgray', opacity: '.75', fontSize: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: "30px"}}>LOGIN</h2>
                </div>
                <div className="tile-body">

                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <label className="form-group">
                            <i className="material-icons">person</i>
                            <label htmlFor="username">ID</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                                autofocus="true"
                            />
                            <span className="underline"></span>
                        </label>

                        <label className="form-group">
                            <i className="material-icons">lock</i>
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                style={{fontFamily: "'Open Sans', sans-serif"}}
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                            <div className="underline"></div>
                        </label>

                        <label className="form-group">
                            <button
                                className="btn btn-success btn-block"
                                style={{marginTop: "20px"}}
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
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
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                    <button
                        className="btn btn-secondary btn-block"
                        style={{marginTop: "20px", marginRight: "7px", width: "102px"}}
                    >
                        <Link to="/idFind" style={{color: "white"}}><span>ID Find</span></Link>
                    </button>
                    <button
                        className="btn btn-secondary btn-block"
                        style={{marginTop: "20px", marginRight: "7px", width: "101px"}}
                    >
                        <Link to="/pwFind" style={{color: "white"}}><span>PW Find</span></Link>
                    </button>
                    <button
                        className="btn btn-primary btn-block"
                        style={{marginTop: "20px", width: "102px"}}
                    >
                        <Link to="/join" style={{color: "white"}}><span>Sign Up</span></Link>
                    </button>
                </div>
            </div>
            </body>
        );
    }
}

export default withRouter(Login);