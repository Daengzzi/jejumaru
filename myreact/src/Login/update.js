import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../services/authService';
import './update.css';
let pwChk = false;

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
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

class Update extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordChk = this.onChangePasswordChk.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
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

    handleUpdate(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.updateInfo(this.state.username, this.state.password).then(
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

    handleDelete(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.deleteInfo(this.state.username).then(
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

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                username: user.username
            });
        }
    }

    render() {
        return (
            <body className="update-body">
            <Link className="navbar-brand logo" to="/jejumaru">
                <i className="fas fa-home" style={{position:"fixed", right:"45px", top:"35px" ,color:"#fff", fontSize:"30px"}}/>
            </Link>
            <div className="tile" style={{marginTop: '0px', marginLeft: "0px"}}>
                <div className="tile-header">
                    <h2 style={{color: 'darkgray', opacity: '.75', fontSize: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>UPDATE</h2>
                </div>

                <div className="tile-body">
                    <Form
                        onSubmit={this.handleUpdate}
                        ref={c => {
                            this.form = c;
                        }}
                    >

                        <label className="form-group">
                            <i className="material-icons">person</i>
                            <label htmlFor="username">아이디</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                readOnly
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
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, vpassword]}
                            />
                            <div className="underline"></div>
                        </label>

                        <label className="form-group">
                            <i className="material-icons">lock</i>
                            <label htmlFor="passwordChk">Confirm Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="passwordChk"
                                value={this.state.passwordChk}
                                onChange={this.onChangePasswordChk}
                                validations={[required, vpasswordChk]}
                            />
                            <div className="underline"></div>
                        </label>

                        <label className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Update</span>
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

                    {/*<button className="btn btn-secondary" onClick="history.back()">취소</button>*/}
                    {/*<button id="btn-update" className="btn btn-warning">수정</button>*/}
                    {/*<button id="btn-delete" className="btn btn-danger">탈퇴</button>*/}


                </Form>
                    <Form
                        onSubmit={this.handleDelete}
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
                                className="btn btn-danger btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign Out</span>
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
            </div>
            </div>
            </body>
        );
    }
}

export default withRouter(Update);