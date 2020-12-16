import React, { Component } from 'react';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";
import './login.css';
import { isEmail } from "validator";
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

class idFind extends Component {
    constructor(props) {
        super(props);
        this.confirmMail = this.confirmMail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            name: "",
            email: "",
            loading: false,
            successful: false,
            message: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    confirmMail(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.findId(
                this.state.name,
                this.state.email
            ).then(
                response => {
                    alert("메일을 보냈습니다.");
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
            <body className="login-body">
            <Link className="navbar-brand logo" to="/jejumaru">
                <i className="fas fa-home" style={{position:"fixed", right:"45px", top:"35px" ,color:"#fff", fontSize:"30px"}}/>
            </Link>
            <div className="tile" style={{marginLeft: '-30px',marginTop: '30px'}}>
                <div className="tile-header">
                    <h2 style={{color: 'darkgray', opacity: '.75', fontSize: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: "30px"}}>ID FIND</h2>
                </div>
                <div className="tile-body">
                    <Form
                        onSubmit={this.confirmMail}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <label className="form-group">
                            <i className="material-icons">person</i>
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required]}
                                autofocus="true"
                            />
                            <span className="underline"></span>
                        </label>

                        <label className="form-group">
                            <i className="material-icons">message</i>
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required]}
                            />
                            <div className="underline"></div>
                        </label>

                        <label className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                style={{marginTop: "20px"}}
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Find</span>
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
                    <Link to="/login" style={{color: "white"}}>
                        <button
                            className="btn btn-success btn-block"
                            style={{marginTop: "10px"}}
                        >
                            <span>Login</span>
                        </button>
                    </Link>
                </div>
            </div>
            </body>
        );
    }
}

export default withRouter(idFind);