import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, withRouter} from 'react-router-dom';

import './intro.css';

// import './bootstrap'
// import './bootstrap1'
// import './bootstrap2'

// import $ from 'jquery';
// import jquery from 'jquery';
// window.$ = window.jQuery=jquery;



class Intro extends Component {
    componentDidMount(){

        const script = document.createElement("script");

        script.src = "https://daks2k3a4ib2z.cloudfront.net/5317d67d660658b254000454/js/webflow.js?2f83b8326cc4c8f7327b5dba30444a37";
        script.async = true;

        document.body.appendChild(script);


    }

    render() {
        return (
            <>
                <div className="intro-header" data-ix="show-nav" >
                    <div className="w-container w-contents" style={{ marginLeft: "10%" }}>
                        <div className="main-heading-wrapper">
                            <h1 data-ix="fade-in-heading">제주마루</h1>
                            <h1 className="without-code" data-ix="fade-in-heading-3">JEJUMARU</h1>
                            {/*<div class="w-hidden-small w-hidden-tiny header-1" data-ix="heading-text-load">마루? <a style={{ textDecoration: "none", color: "black"}}target="_blank"  href="https://bit.ly/1CD88Kh"></a></div>*/}
                        </div>
                        {/* <h2 class="main-subtitle" data-ix="subtitle-load">누구나 아는 핫 플레이스부터 감성충전 힐링여행지까지,<br/> 다채롭고&nbsp;아름다운 섬 제주&nbsp;의 구석구석을 소개하는 사이트입니다.</h2> */}
                        <a className="w-inline-block down-arrow" href="#more" data-ix="down-arrow">
                            <div className="down-inner" data-ix="down-arrow-on-load" >
                                <img src="http://uploads.webflow.com/5317d67d660658b254000454/534dd73febf08c3e3000003c_arrow-down.svg" alt="534dd73febf08c3e3000003c_arrow-down.svg"/>
                            </div>
                        </a>
                        {/*<div class="w-hidden-medium w-hidden-small w-hidden-tiny header-2" data-ix="heading-text-load">START🍊</div>*/}
                    </div>
                    <div className="intro_object _2"/>
                    <div className="intro_object"/>
                </div>

                <div className="intro-section" id="more" data-scroll="mid" data-ix="scroll-text-fade-away">
                    <div className="w-container">
                        <h2>소개</h2>
                        <div className="w-row">
                            <div className="w-col w-col-3 feature-pill" data-ix="scale-on-scroll">
                                <img className="feature-icon" src="https://post-phinf.pstatic.net/MjAxOTAyMTFfMTQ2/MDAxNTQ5ODQ4NDA1NTQy.WrpA1AaRhBTh1RTN5hSClmRaPWEId-0c1KtoI7vf--og.7_mEuBRmj3tz9aVUGrD44Yu-DfQPb6BYHKBnVsUd0Xkg.JPEG/%EC%A0%9C%EC%A3%BC%EB%8F%84-iStock-900801586.jpg?type=w1200" width="100%" height="200px"/>
                                <h3>마루란</h3>
                                <p>등성이를 이루는 지붕이나 산 따위의 꼭대기를 일컫는말.</p>
                            </div>
                            <div className="w-col w-col-3 feature-pill" data-ix="scale-on-scroll-delay-100"><img className="feature-icon" src="https://t1.daumcdn.net/cfile/tistory/2168774256F10EEF0A" width="100%" height="200px"/>
                                <h3>'탐라'가 '제주'로 바뀌다</h3>
                                <p> 고종(1213~1259) 때에 이르러서는 이름 또한 <br/>
                                    '바다 건너 큰 고을'이란 뜻을 지닌 '제주'로 바뀌었다. <br/>
                                    고려시대 제주의 대표적인 흔적은 삼별초와 관련된 유적들이다.</p>
                            </div>

                            <div className="w-col w-col-3 feature-pill" data-ix="scale-on-scroll-delay-300"><img className="feature-icon" src="https://cdn.pixabay.com/photo/2018/08/05/15/41/beach-3585794_1280.jpg"  width="100%" height="200px"/>
                                <h3>제주마루</h3>
                                <p>누구나 아는 핫 플레이스부터 감성충전 힐링여행지까지,
                                    다채롭고 아름다운 섬 제주의 구석구석을 소개하는 사이트입니다.
                                    제주마루는 제주관광공사에서 제공받은 정보를 바탕으로 정확하고 신뢰성 있는 제주도 관광정보를 제공합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

//
// <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>  <!-- Intro -->
// <script type="text/javascript" src="https://daks2k3a4ib2z.cloudfront.net/5317d67d660658b254000454/js/webflow.js?2f83b8326cc4c8f7327b5dba30444a37"></script>


export default withRouter(Intro);