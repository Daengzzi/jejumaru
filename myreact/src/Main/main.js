import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import '../Etc/ScrollToTop';
import logo from '../Logo/logo.png';
import './MainStyle2.css';
import './MainStyle3.css';
import './MainStyle4.css';
import './MainStyle5.css';
import '../fonts/simple-line-icons.min.css';
import '../fonts/fontawesome5-overrides.min.css';
import '../fonts/font-awesome.min.css';
import '../fonts/fontawesome-all.min.css';
import './MainStyle1.css';
import List from '../List/list';
import Review from '../Review/Review';
import Intro from '../Intro/intro';
import Login from '../Login/login';
import Join from '../Login/join';
import Update from '../Login/update';
import Culture from "../Intro/culture";
import NewsLetter from '../News/newsLetter';
import Search from '../List/search';
import IdFind from "../Login/idFind";
import PwFind from "../Login/pwFind";
import AuthService from '../services/authService';
import 'aos/dist/aos.css';
import AOS from 'aos';

import $ from "jquery";
import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

class Main extends Component{
    state = {
        isLoading: true,
        groups: [],
    };

    async componentDidMount(){
		// $('.summernote').summernote({
		// 	tabsize: 2,
		// 	height: 300
		// });
        AOS.init();

        const response = await fetch('/api/recommand');
        const body = await response.json();
        this.setState({groups: body, isLoading: false})
    }
    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        let carousel1 = [];
        let carousel2 = [];
        let carousel3 = [];

        for (let i = 0; i < 3; i++){
            if(i % 3 == 0){
                carousel1.push(<div className="col-lg-4 mb-3">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}>
                            <img className="card-img-top" src={groups[i].pthumb}/>
                        <div className="card-body"
                             style={{cursor: "pointer"}}>
                            <h3 className="card-title"
                                style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                {groups[i].ptitle}
                            </h3>
                            <h5 className="card-sub-title"
                                style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                            </h5>
                            <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                            <p id="lorem" style={{textAlign: "center"}}>
                                {groups[i].ptel}
                            </p>
                        </div></Link>
                    </div>
                </div>);
            } else {
                carousel1.push(<div className="col-lg-4 mb-3 d-none d-lg-block">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}><img className="card-img-top"
                                                                               src={groups[i].pthumb}/>

                        <div className="card-body"
                             style={{cursor: "pointer"}}>
                            <h3 className="card-title"
                                style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                {groups[i].ptitle}
                            </h3>
                            <h5 className="card-sub-title"
                                style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                            </h5>
                            <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                            <p id="lorem" style={{textAlign: "center"}}>
                                {groups[i].ptel}
                            </p>
                        </div>
                        </Link>
                    </div>
                </div>);
            }
        }

        for (let i = 3; i < 6; i++){
            if(i % 3 == 0){
                carousel2.push(<div className="col-lg-4 mb-3">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}>
                            <img className="card-img-top" src={groups[i].pthumb}/>
                            <div className="card-body"
                                 style={{cursor: "pointer"}}>
                                <h3 className="card-title"
                                    style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                    {groups[i].ptitle}
                                </h3>
                                <h5 className="card-sub-title"
                                    style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                    {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                                </h5>
                                <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                                <p id="lorem" style={{textAlign: "center"}}>
                                    {groups[i].ptel}
                                </p>
                            </div></Link>
                    </div>
                </div>);
            } else {
                carousel2.push(<div className="col-lg-4 mb-3 d-none d-lg-block">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}><img className="card-img-top"
                                                                               src={groups[i].pthumb}/>

                            <div className="card-body"
                                 style={{cursor: "pointer"}}>
                                <h3 className="card-title"
                                    style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                    {groups[i].ptitle}
                                </h3>
                                <h5 className="card-sub-title"
                                    style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                    {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                                </h5>
                                <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                                <p id="lorem" style={{textAlign: "center"}}>
                                    {groups[i].ptel}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>);
            }
        }

        for (let i = 6; i < 9; i++){
            if(i % 3 == 0){
                carousel3.push(<div className="col-lg-4 mb-3">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}>
                            <img className="card-img-top" src={groups[i].pthumb}/>
                            <div className="card-body"
                                 style={{cursor: "pointer"}}>
                                <h3 className="card-title"
                                    style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                    {groups[i].ptitle}
                                </h3>
                                <h5 className="card-sub-title"
                                    style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                    {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                                </h5>
                                <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                                <p id="lorem" style={{textAlign: "center"}}>
                                    {groups[i].ptel}
                                </p>
                            </div></Link>
                    </div>
                </div>);
            } else {
                carousel3.push(<div className="col-lg-4 mb-3 d-none d-lg-block">
                    <div className="bg-light border rounded shadow card" data-bs-hover-animate="pulse" style={{minHeight: "350px"}}>
                        <Link to={"/jejumaru/detail/pno/"+groups[i].pno+"/page/1"}><img className="card-img-top"
                                                                               src={groups[i].pthumb}/>

                            <div className="card-body"
                                 style={{cursor: "pointer"}}>
                                <h3 className="card-title"
                                    style={{color: "rgb(81,87,94)", fontSize: "18px", textAlign: "center"}}>
                                    {groups[i].ptitle}
                                </h3>
                                <h5 className="card-sub-title"
                                    style={{color: "orange", fontSize: "15px", textAlign: "center"}}>
                                    {groups[i].ptitle.split(" ")[1]} {groups[i].ptitle.split(" ")[2]}
                                </h5>
                                <p className="card-text" style={{color: "rgb(81,87,94)"}}></p>
                                <p id="lorem" style={{textAlign: "center"}}>
                                    {groups[i].ptel}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>);
            }
        }

        return (
            <>
            <section style={{textAlign :"center", maxHeight:"calc(100vh - 100px)", overflow:"hidden", marginTop:"100px"}}>
                <video style={{width: "100vw"}} autoPlay muted loop id="myVideo">
                    <source
                        src="https://storage.googleapis.com/null_jeju/%EC%84%9C%EA%B7%80%ED%8F%AC%20%EA%B4%80%EA%B4%91%ED%99%8D%EB%B3%B4%EC%98%81%EC%83%81%20%EB%93%9C%EB%A1%A05%EB%B6%84-wo.gl.mp4#t=8,288" type="video/mp4"/>
                </video>
         </section>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <h2 className="mb-3 text-warning">추천 플레이스</h2>
                </div>
                <div className="col-4 text-right">
                    <a className="btn btn-warning mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev"
                        style= {{border:"none"}}>
                        <i className="fas fa-angle-left" style={{ width:"100%", height:"100%", color :"#fff"}}></i>
                    </a>
                    <a className="btn btn-warning mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next"
                        style= {{border:"none"}}>
                        <i className="fas fa-angle-right" style={{ width:"100%", height:"100%", color :"#fff"}}></i>
                    </a>
                </div>
                <div className="col-12">
                    <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
    
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row">
                                    {carousel1}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    {carousel2}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    {carousel3}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row space-rows">
                <div className="col-8 text-left event-head"  style={{marginBottom:"-20px"}}>
                    <h2 className="mb-3 text-warning event-title">공지사항</h2>
                </div>
                <div className="col-4 text-right" style={{marginBottom:"-20px", padding:"0"}} >
                    <Link className="btn mb-3 mr-1" to="/jejumaru/notice/page/1" role="button"
                        style={{width: "40px", height: "40px",  border: "none" }}>
                        <i className="fas fa-plus" style={{width: "100%",  height: "100%",  color: "orange", fontSize: "20px" }} ></i>
                    </Link>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col col-lg-4 event-box">
                            <Link to="/jejumaru/notice/detail/38">
                            <img className="card cards-shadown cards-hover event-img" src="https://storage.googleapis.com/null_jeju/event1.png"
                                data-aos="fade" data-aos-duration="950"/>
                            </Link>
                        </div>
                        <div className="col col-lg-4 event-box d-none d-lg-block">
                            <Link to="/jejumaru/notice/detail/37">
                            <img className="card cards-shadown cards-hover event-img" src="https://storage.googleapis.com/null_jeju/event2.png"
                                data-aos="fade" data-aos-duration="950"/>
                            </Link>
                        </div>
                        <div className="col col-lg-4 event-box d-none d-lg-block">
                            <Link to="/jejumaru/notice/detail/38">
                            <img className="card cards-shadown cards-hover event-img" src="https://storage.googleapis.com/null_jeju/event3.png"
                                data-aos="fade" data-aos-duration="950"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </> 
        )
    }
        
}
        

    


export default withRouter(Main);;
